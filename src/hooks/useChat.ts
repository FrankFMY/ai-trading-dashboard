import { useChat as useAiChat } from 'ai/react';
import { useChatStore } from '@/store';
import { API_ENDPOINTS, AI_SYSTEM_PROMPT } from '@/lib/config';
import { validateChatMessage } from '@/lib/validators';
import { ChatMessage, UseChatReturn } from '@/types';

/**
 * Кастомный хук для работы с ИИ чатом
 */
export function useChat(): UseChatReturn {
    const {
        messages: storeMessages,
        isLoading: storeLoading,
        error: storeError,
        input: storeInput,
        addMessage,
        setMessages,
        setLoading,
        setError,
        clearChat: storeClearChat,
        clearError,
    } = useChatStore();

    const {
        input: aiInput,
        isLoading: aiLoading,
        error: aiError,
    } = useAiChat({
        api: API_ENDPOINTS.ai,
        onFinish: message => {
            console.log('AI response completed');
            // Добавляем сообщение в store
            const chatMessage: ChatMessage = {
                role: 'assistant',
                content: message.content,
                timestamp: new Date().toISOString(),
            };
            addMessage(chatMessage);
        },
        onError: error => {
            console.error('AI chat error:', error);
            setError(error.message || 'Ошибка обработки запроса ИИ');
        },
        body: {
            marketData: null, // Будет передаваться при отправке
        },
    });

    // Синхронизируем состояние с AI библиотекой
    const messages = storeMessages;
    const isLoading = aiLoading || storeLoading;
    const error = aiError?.message || storeError;
    const input = aiInput || storeInput;

    const sendMessage = async (message: string) => {
        if (!message.trim() || isLoading) return;

        // Валидация сообщения
        const validationResult = validateChatMessage({
            role: 'user',
            content: message,
        });

        if (!validationResult.success) {
            setError('Некорректное сообщение');
            return;
        }

        // Добавляем пользовательское сообщение
        const userMessage: ChatMessage = {
            role: 'user',
            content: message,
            timestamp: new Date().toISOString(),
        };
        addMessage(userMessage);

        // Отправляем в AI
        try {
            setLoading(true);
            clearError();

            const formData = new FormData();
            formData.append('message', message);

            const response = await fetch(API_ENDPOINTS.ai, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [
                        {
                            role: 'system',
                            content: AI_SYSTEM_PROMPT,
                        },
                        userMessage,
                    ],
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Обрабатываем stream ответ
            const reader = response.body?.getReader();
            if (!reader) {
                throw new Error('Не удалось получить ответ от сервера');
            }

            let assistantMessage = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = new TextDecoder().decode(value);
                const lines = chunk.split('\n');

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = line.slice(6);
                        if (data === '[DONE]') break;

                        try {
                            const parsed = JSON.parse(data);
                            if (parsed.choices?.[0]?.delta?.content) {
                                assistantMessage +=
                                    parsed.choices[0].delta.content;
                            }
                        } catch {
                            // Игнорируем некорректные JSON
                        }
                    }
                }
            }

            // Добавляем ответ ассистента
            if (assistantMessage) {
                const assistantChatMessage: ChatMessage = {
                    role: 'assistant',
                    content: assistantMessage,
                    timestamp: new Date().toISOString(),
                };
                addMessage(assistantChatMessage);
            }
        } catch {
            setError('Ошибка отправки сообщения');
        } finally {
            setLoading(false);
        }
    };

    const clearChat = () => {
        storeClearChat();
        // Также очищаем AI состояние
        setMessages([]);
    };

    return {
        messages,
        input,
        isLoading,
        error,
        sendMessage,
        clearChat,
    };
}

/**
 * Хук для получения последнего сообщения
 */
export function useLastMessage() {
    const { messages } = useChat();
    return messages.length > 0 ? messages[messages.length - 1] : null;
}

/**
 * Хук для проверки, есть ли сообщения
 */
export function useHasMessages() {
    const { messages } = useChat();
    return messages.length > 0;
}
