'use client';

import { useChat } from '@/hooks/useChat';
import { useCryptoData } from '@/hooks/useCryptoData';
import { useToast } from '@/components/ui/useToast';
import { Send, Bot, User, TrendingUp, Trash2 } from 'lucide-react';
import Markdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import { formatRelativeTime } from '@/lib/utils';

export default function AIChat() {
    const { data: cryptoData } = useCryptoData();
    const {
        messages,
        input,
        isLoading,
        error,
        sendMessage,
        clearChat,
        setInput,
    } = useChat(cryptoData || undefined);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const message = input.trim();
        try {
            sendMessage(message);
        } catch {
            toast({
                title: 'Ошибка отправки',
                description: 'Не удалось отправить сообщение',
                variant: 'destructive',
            });
        }
    };

    const handleClearChat = () => {
        clearChat();
        toast({
            title: 'Чат очищен',
            description: 'История сообщений удалена',
            variant: 'info',
        });
    };

    return (
        <div className='flex flex-col h-[600px] bg-white dark:bg-gray-900 rounded-lg shadow-lg'>
            {/* Заголовок */}
            <div className='flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700'>
                <div className='flex items-center gap-2'>
                    <Bot className='w-6 h-6 text-blue-500' />
                    <h2 className='text-lg font-semibold text-gray-900 dark:text-white'>
                        ИИ Трейдинг-Аналитик
                    </h2>
                </div>

                <div className='flex items-center gap-2'>
                    {cryptoData && (
                        <div className='flex items-center gap-1 text-xs text-green-600 dark:text-green-400'>
                            <TrendingUp className='w-3 h-3' />
                            <span>Данные актуальны</span>
                        </div>
                    )}
                    <button
                        onClick={handleClearChat}
                        className='flex items-center gap-1 px-2 py-1 text-xs text-gray-500 hover:text-red-500 transition-colors'
                        title='Очистить чат'
                    >
                        <Trash2 className='w-3 h-3' />
                    </button>
                </div>
            </div>

            {/* Область сообщений */}
            <div className='flex-1 overflow-y-auto p-4 space-y-4'>
                <AnimatePresence>
                    {messages.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className='text-center text-gray-500 dark:text-gray-400 py-8'
                        >
                            <Bot className='w-12 h-12 mx-auto mb-4 text-gray-300' />
                            <p className='text-lg font-medium'>
                                Добро пожаловать в AI Трейдинг Дашборд!
                            </p>
                            <p className='text-sm mt-2'>
                                Задайте вопрос о криптовалютах или попросите
                                проанализировать рынок
                            </p>
                        </motion.div>
                    )}

                    {messages.map((message, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`flex gap-3 ${
                                message.role === 'user'
                                    ? 'justify-end'
                                    : 'justify-start'
                            }`}
                        >
                            <div
                                className={`flex gap-3 max-w-[80%] ${
                                    message.role === 'user'
                                        ? 'flex-row-reverse'
                                        : 'flex-row'
                                }`}
                            >
                                <div className='flex-shrink-0'>
                                    {message.role === 'user' ? (
                                        <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center'>
                                            <User className='w-4 h-4 text-white' />
                                        </div>
                                    ) : (
                                        <div className='w-8 h-8 bg-green-500 rounded-full flex items-center justify-center'>
                                            <Bot className='w-4 h-4 text-white' />
                                        </div>
                                    )}
                                </div>

                                <div
                                    className={`px-4 py-2 rounded-xl ${
                                        message.role === 'user'
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                                    }`}
                                >
                                    <div className='prose prose-sm max-w-none dark:prose-invert'>
                                        <Markdown>{message.content}</Markdown>
                                    </div>
                                    {message.timestamp && (
                                        <div className='text-xs opacity-70 mt-1'>
                                            {formatRelativeTime(
                                                message.timestamp
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className='flex gap-3 justify-start'
                        >
                            <div className='w-8 h-8 bg-green-500 rounded-full flex items-center justify-center'>
                                <Bot className='w-4 h-4 text-white' />
                            </div>
                            <div className='bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-xl'>
                                <div className='flex items-center gap-1'>
                                    <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'></div>
                                    <div
                                        className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
                                        style={{
                                            animationDelay: '0.1s',
                                        }}
                                    ></div>
                                    <div
                                        className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
                                        style={{
                                            animationDelay: '0.2s',
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Форма ввода */}
            <form
                onSubmit={handleSubmit}
                className='p-4 border-t border-gray-200 dark:border-gray-700'
            >
                <div className='relative'>
                    <input
                        value={input}
                        onChange={e => {
                            setInput(e.target.value);
                        }}
                        placeholder='Спросите о рынке криптовалют...'
                        disabled={isLoading}
                        className='w-full pl-4 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     disabled:opacity-50 disabled:cursor-not-allowed'
                    />
                    <button
                        type='submit'
                        disabled={isLoading || !input.trim()}
                        className='absolute right-2 top-1/2 -translate-y-1/2 p-2
                     text-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        <Send className='w-5 h-5' />
                    </button>
                </div>

                {error && (
                    <div className='mt-2 text-xs text-red-500'>
                        Ошибка: {error}
                    </div>
                )}

                {cryptoData && (
                    <div className='mt-2 text-xs text-gray-500 dark:text-gray-400'>
                        ✅ Актуальные данные загружены • Последнее обновление:{' '}
                        {formatRelativeTime(new Date())}
                    </div>
                )}
            </form>
        </div>
    );
}
