import { createOllama } from 'ollama-ai-provider';
import { streamText } from 'ai';
import { validateAiRequestParams } from '@/lib/validators';
import { config, AI_SYSTEM_PROMPT } from '@/lib/config';
import { retry } from '@/lib/utils';

const ollama = createOllama({
    baseURL: config.ollamaBaseUrl,
});

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Валидация входных данных
        const validationResult = validateAiRequestParams(body);
        if (!validationResult.success) {
            return Response.json(
                {
                    success: false,
                    error: 'Некорректные данные запроса',
                    details: validationResult.error.errors,
                },
                { status: 400 }
            );
        }

        const { messages, marketData } = validationResult.data;

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
                          content: `Актуальные данные рынка: ${JSON.stringify(
                              marketData,
                              null,
                              2
                          )}`,
                      },
                  ]
                : []),
        ];

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

        return result.toDataStreamResponse();
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
