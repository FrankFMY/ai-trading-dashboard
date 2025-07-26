import { createOllama } from 'ollama-ai-provider';
import { streamText } from 'ai';

const ollama = createOllama({
    baseURL: 'http://localhost:11434/api',
});

export async function POST(req: Request) {
    try {
        const { messages, marketData } = await req.json();

        const result = await streamText({
            model: ollama('llama3.2-vision:11b'),
            messages: [
                {
                    role: 'system',
                    content: `Ты опытный трейдинг-аналитик и финансовый советник. 
          Анализируй рыночные данные криптовалют и давай профессиональные торговые рекомендации.
          
          Учитывай:
          - Текущие цены и изменения
          - Технические индикаторы
          - Рыночные тренды
          - Объемы торгов
          - Уровни поддержки и сопротивления
          
          Отвечай структурированно с разделами:
          📈 **Анализ рынка**
          🎯 **Торговые сигналы** 
          ⚠️ **Риски**
          💡 **Рекомендации**`,
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
            ],
            temperature: 0.3,
            maxTokens: 1000,
        });

        return result.toDataStreamResponse();
    } catch (error) {
        console.error('AI API Error:', error);
        return Response.json(
            { error: 'Ошибка обработки запроса ИИ' },
            { status: 500 }
        );
    }
}
