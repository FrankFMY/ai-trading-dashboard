'use client';

import { Loader2, RefreshCw } from 'lucide-react';
import { useCryptoData } from '@/hooks/useCryptoData';
import { useToast } from '@/components/ui/useToast';
import { COIN_INFO } from '@/lib/config';
import { formatRelativeTime } from '@/lib/utils';
import CryptoCard from './CryptoCard';
import { motion, AnimatePresence } from 'framer-motion';

export default function CryptoPrices() {
    const { data, isLoading, error, refetch } = useCryptoData();
    const { toast } = useToast();

    const handleRefresh = async () => {
        try {
            await refetch();
            toast({
                title: 'Данные обновлены',
                description: 'Курсы криптовалют успешно обновлены',
                variant: 'success',
            });
        } catch {
            toast({
                title: 'Ошибка обновления',
                description: 'Не удалось обновить данные',
                variant: 'destructive',
            });
        }
    };

    if (isLoading) {
        return (
            <div className='bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6'>
                <div className='flex items-center justify-center h-48'>
                    <Loader2 className='w-8 h-8 animate-spin text-blue-500' />
                    <span className='ml-2 text-gray-600 dark:text-gray-400'>
                        Загрузка данных...
                    </span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6'>
                <div className='text-center text-red-500'>
                    <p className='mb-4'>Ошибка: {error}</p>
                    <button
                        onClick={handleRefresh}
                        className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
                    >
                        Повторить
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6'>
            <div className='flex items-center justify-between mb-6'>
                <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>
                    Цены криптовалют
                </h2>
                <button
                    onClick={handleRefresh}
                    disabled={isLoading}
                    className='flex items-center gap-1 px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 transition-colors'
                >
                    <RefreshCw
                        className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`}
                    />
                    Обновить
                </button>
            </div>

            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='space-y-4'
                >
                    {data &&
                        Object.entries(data).map(([coinId, coinData]) => {
                            const coinInfo =
                                COIN_INFO[coinId as keyof typeof COIN_INFO];
                            if (!coinInfo) return null;

                            return (
                                <CryptoCard
                                    key={coinId}
                                    coinId={coinId}
                                    data={coinData}
                                    coinInfo={coinInfo}
                                />
                            );
                        })}
                </motion.div>
            </AnimatePresence>

            <div className='mt-4 text-xs text-gray-500 dark:text-gray-400 text-center'>
                Данные предоставлены CoinGecko •{' '}
                {data
                    ? `Обновлено ${formatRelativeTime(new Date())}`
                    : 'Нет данных'}
            </div>
        </div>
    );
}
