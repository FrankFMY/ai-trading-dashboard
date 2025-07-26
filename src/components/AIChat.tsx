'use client';

import { useChat } from 'ai/react';
import { useState, useEffect } from 'react';
import { Send, Bot, User, TrendingUp } from 'lucide-react';
import Markdown from 'react-markdown';

interface CryptoData {
    [key: string]: {
        usd: number;
        usd_24h_change: number;
        usd_market_cap: number;
        usd_24h_vol: number;
    };
}

export default function AIChat() {
    const [cryptoData, setCryptoData] = useState<CryptoData | null>(null);
    const [isLoadingData, setIsLoadingData] = useState(false);

    const { messages, input, handleInputChange, handleSubmit, isLoading } =
        useChat({
            api: '/api/ai',
            onFinish: () => {
                console.log('AI response completed');
            },
            body: {
                marketData: cryptoData,
            },
        });

    // Загрузка актуальных данных о криптовалютах
    const fetchCryptoData = async () => {
        setIsLoadingData(true);
        try {
            const response = await fetch(
                '/api/crypto?coins=bitcoin,ethereum,solana,cardano,polkadot'
            );
            const result = await response.json();

            if (result.success) {
                setCryptoData(result.data);
            }
        } catch (error) {
            console.error('Error fetching crypto data:', error);
        } finally {
            setIsLoadingData(false);
        }
    };

    useEffect(() => {
        fetchCryptoData();
        // Обновляем данные каждые 2 минуты
        const interval = setInterval(fetchCryptoData, 120000);
        return () => clearInterval(interval);
    }, []);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSubmit(e);
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

                <button
                    onClick={fetchCryptoData}
                    disabled={isLoadingData}
                    className='flex items-center gap-1 px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50'>
                    <TrendingUp className='w-4 h-4' />
                    {isLoadingData ? 'Обновление...' : 'Обновить данные'}
                </button>
            </div>

            {/* Область сообщений */}
            <div className='flex-1 overflow-y-auto p-4 space-y-4'>
                {messages.length === 0 && (
                    <div className='text-center text-gray-500 dark:text-gray-400 py-8'>
                        <Bot className='w-12 h-12 mx-auto mb-4 text-gray-300' />
                        <p className='text-lg font-medium'>
                            Добро пожаловать в AI Трейдинг Дашборд!
                        </p>
                        <p className='text-sm mt-2'>
                            Задайте вопрос о криптовалютах или попросите
                            проанализировать рынок
                        </p>
                    </div>
                )}

                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex gap-3 ${
                            message.role === 'user'
                                ? 'justify-end'
                                : 'justify-start'
                        }`}>
                        <div
                            className={`flex gap-3 max-w-[80%] ${
                                message.role === 'user'
                                    ? 'flex-row-reverse'
                                    : 'flex-row'
                            }`}>
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
                                }`}>
                                <div className='prose prose-sm max-w-none dark:prose-invert'>
                                    <Markdown>{message.content}</Markdown>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className='flex gap-3 justify-start'>
                        <div className='w-8 h-8 bg-green-500 rounded-full flex items-center justify-center'>
                            <Bot className='w-4 h-4 text-white' />
                        </div>
                        <div className='bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-xl'>
                            <div className='flex items-center gap-1'>
                                <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'></div>
                                <div
                                    className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
                                    style={{ animationDelay: '0.1s' }}></div>
                                <div
                                    className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
                                    style={{ animationDelay: '0.2s' }}></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Форма ввода */}
            <form
                onSubmit={handleFormSubmit}
                className='p-4 border-t border-gray-200 dark:border-gray-700'>
                <div className='relative'>
                    <input
                        value={input}
                        onChange={handleInputChange}
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
                     text-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed'>
                        <Send className='w-5 h-5' />
                    </button>
                </div>

                {cryptoData && (
                    <div className='mt-2 text-xs text-gray-500 dark:text-gray-400'>
                        ✅ Актуальные данные загружены • Последнее обновление:{' '}
                        {new Date().toLocaleTimeString()}
                    </div>
                )}
            </form>
        </div>
    );
}
