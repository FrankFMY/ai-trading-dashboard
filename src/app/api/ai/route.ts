import { createOllama } from 'ollama-ai-provider';
import { streamText } from 'ai';
import { config, AI_SYSTEM_PROMPT } from '@/lib/config';
import { retry } from '@/lib/utils';

const ollama = createOllama({
    baseURL: config.ollamaBaseUrl,
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log('AI API request body:', body);

        // Проверяем формат запроса от библиотеки ai
        if (body.messages && Array.isArray(body.messages)) {
            // Формат от библиотеки ai
            const messages = body.messages;
            const marketData = body.marketData;

            console.log('Market data received:', marketData ? 'Yes' : 'No');
            if (marketData) {
                console.log('Market data keys:', Object.keys(marketData));
            }

            // Подготовка сообщений для ИИ
            const aiMessages = [
                {
                    role: 'system' as const,
                    content: AI_SYSTEM_PROMPT,
                },
                ...messages,
                ...(marketData
                    ? [
                          {
                              role: 'user' as const,
                              content: `Актуальные данные рынка криптовалют: ${JSON.stringify(
                                  marketData,
                                  null,
                                  2
                              )}`,
                          },
                      ]
                    : []),
            ];

            console.log('Sending to Ollama:', aiMessages.length, 'messages');
            console.log(
                'Last message content preview:',
                aiMessages[aiMessages.length - 1]?.content?.substring(0, 100) +
                    '...'
            );

            // Отправка запроса к ИИ с retry логикой
            const result = await retry(
                async () => {
                    return await streamText({
                        model: ollama(config.ollamaModel),
                        messages: aiMessages,
                        temperature: 0.3,
                        maxTokens: 1000,
                    });
                },
                config.maxRetries,
                config.retryDelay
            );

            // Возвращаем правильный формат для библиотеки ai
            return result.toDataStreamResponse();
        } else {
            // Для других форматов возвращаем ошибку
            return Response.json(
                {
                    success: false,
                    error: 'Неподдерживаемый формат запроса',
                    details: 'Ожидается массив messages',
                },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error('AI API Error:', error);

        const errorMessage =
            error instanceof Error ? error.message : 'Неизвестная ошибка';

        return Response.json(
            {
                success: false,
                error: 'Ошибка обработки запроса ИИ',
                details: errorMessage,
                timestamp: new Date().toISOString(),
            },
            { status: 500 }
        );
    }
}
