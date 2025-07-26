import AIChat from '@/components/AIChat';
import CryptoPrices from '@/components/CryptoPrices';
import { BarChart3, TrendingUp, Zap } from 'lucide-react';

export default function Home() {
    return (
        <div className='min-h-screen bg-gray-100 dark:bg-gray-950'>
            {/* Заголовок */}
            <header className='bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='flex items-center justify-between h-16'>
                        <div className='flex items-center gap-3'>
                            <div className='w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center'>
                                <BarChart3 className='w-6 h-6 text-white' />
                            </div>
                            <div>
                                <h1 className='text-xl font-bold text-gray-900 dark:text-white'>
                                    AI Трейдинг Дашборд
                                </h1>
                                <p className='text-sm text-gray-500 dark:text-gray-400'>
                                    Powered by Llama 3.2 Vision
                                </p>
                            </div>
                        </div>

                        <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400'>
                            <Zap className='w-4 h-4 text-green-500' />
                            <span>Локальный ИИ активен</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Основной контент */}
            <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    {/* Цены криптовалют */}
                    <div className='lg:col-span-1'>
                        <CryptoPrices />
                    </div>

                    {/* AI Чат */}
                    <div className='lg:col-span-2'>
                        <AIChat />
                    </div>
                </div>

                {/* Дополнительная информация */}
                <div className='mt-8 grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <div className='bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6'>
                        <div className='flex items-center gap-3 mb-4'>
                            <TrendingUp className='w-8 h-8 text-green-500' />
                            <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                                Торговые сигналы
                            </h3>
                        </div>
                        <p className='text-gray-600 dark:text-gray-400 text-sm'>
                            ИИ анализирует актуальные данные рынка и
                            предоставляет персонализированные торговые
                            рекомендации
                        </p>
                    </div>

                    <div className='bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6'>
                        <div className='flex items-center gap-3 mb-4'>
                            <BarChart3 className='w-8 h-8 text-blue-500' />
                            <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                                Анализ рынка
                            </h3>
                        </div>
                        <p className='text-gray-600 dark:text-gray-400 text-sm'>
                            Комплексный анализ трендов, поддержки, сопротивления
                            и технических индикаторов
                        </p>
                    </div>

                    <div className='bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6'>
                        <div className='flex items-center gap-3 mb-4'>
                            <Zap className='w-8 h-8 text-purple-500' />
                            <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                                Локальный ИИ
                            </h3>
                        </div>
                        <p className='text-gray-600 dark:text-gray-400 text-sm'>
                            Полная приватность данных - все вычисления
                            происходят локально на вашем устройстве
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
