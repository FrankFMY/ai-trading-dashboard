import { useChat as useAiChat } from 'ai/react';
import { ChatMessage, UseChatReturn, CryptoData } from '@/types';

/**
 * Кастомный хук для работы с ИИ чатом
 */
export function useChat(cryptoData?: CryptoData): UseChatReturn {
    const {
        messages: aiMessages,
        input: aiInput,
        isLoading: aiLoading,
        error: aiError,
        handleSubmit: aiHandleSubmit,
        setInput: aiSetInput,
    } = useAiChat({
        api: '/api/ai',
        body: {
            marketData: cryptoData || null,
        },
        onFinish: message => {
            console.log('AI response completed:', message);
        },
        onError: error => {
            console.error('AI chat error:', error);
        },
    });

    // Преобразуем сообщения в нужный формат, фильтруя системные сообщения
    const messages: ChatMessage[] = aiMessages
        .filter(msg => msg.role !== 'data')
        .map(msg => ({
            role: msg.role as 'system' | 'user' | 'assistant',
            content: msg.content,
            timestamp: new Date().toISOString(),
        }));

    const sendMessage = async (message: string) => {
        if (!message.trim() || aiLoading) return;

        // Используем handleSubmit из useAiChat
        aiSetInput(message);
        // Создаем событие для отправки
        const event = {
            preventDefault: () => {},
        };
        aiHandleSubmit(event);
    };

    const clearChat = () => {
        // Очищаем сообщения, устанавливая пустой массив
        aiSetInput('');
    };

    return {
        messages,
        input: aiInput,
        isLoading: aiLoading,
        error: aiError?.message || null,
        sendMessage,
        clearChat,
        setInput: aiSetInput,
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
