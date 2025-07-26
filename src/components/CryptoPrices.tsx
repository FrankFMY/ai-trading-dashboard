'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Loader2 } from 'lucide-react';

interface CoinData {
    usd: number;
    usd_24h_change: number;
    usd_market_cap: number;
    usd_24h_vol: number;
}

interface CryptoData {
    [key: string]: CoinData;
}

const COIN_INFO = {
    bitcoin: { name: 'Bitcoin', symbol: 'BTC', color: 'text-orange-500' },
    ethereum: { name: 'Ethereum', symbol: 'ETH', color: 'text-blue-500' },
    solana: { name: 'Solana', symbol: 'SOL', color: 'text-purple-500' },
    cardano: { name: 'Cardano', symbol: 'ADA', color: 'text-blue-600' },
    polkadot: { name: 'Polkadot', symbol: 'DOT', color: 'text-pink-500' },
};

export default function CryptoPrices() {
    const [cryptoData, setCryptoData] = useState<CryptoData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            setError(null);
            const response = await fetch(
                '/api/crypto?coins=bitcoin,ethereum,solana,cardano,polkadot'
            );
            const result = await response.json();

            if (result.success) {
                setCryptoData(result.data);
            } else {
                setError(result.error || 'Ошибка загрузки данных');
            }
        } catch (err) {
            setError('Ошибка соединения с API');
            console.error('Fetch error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 120000); // Обновляем каждые 2 минуты
        return () => clearInterval(interval);
    }, []);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 8,
        }).format(price);
    };

    const formatChange = (change: number) => {
        return `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
    };

    const formatMarketCap = (marketCap: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            notation: 'compact',
            compactDisplay: 'short',
        }).format(marketCap);
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
                    <p>Ошибка: {error}</p>
                    <button
                        onClick={fetchData}
                        className='mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
                        Повторить
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6'>
            <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-6'>
                Цены криптовалют
            </h2>

            <div className='space-y-4'>
                {Object.entries(cryptoData || {}).map(([coinId, data]) => {
                    const coinInfo =
                        COIN_INFO[coinId as keyof typeof COIN_INFO];
                    if (!coinInfo) return null;

                    const isPositive = data.usd_24h_change >= 0;

                    return (
                        <div
                            key={coinId}
                            className='flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'>
                            <div className='flex items-center gap-3'>
                                <div className='w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center'>
                                    <span
                                        className={`font-bold text-sm ${coinInfo.color}`}>
                                        {coinInfo.symbol}
                                    </span>
                                </div>
                                <div>
                                    <h3 className='font-medium text-gray-900 dark:text-white'>
                                        {coinInfo.name}
                                    </h3>
                                    <p className='text-sm text-gray-500 dark:text-gray-400'>
                                        {coinInfo.symbol}
                                    </p>
                                </div>
                            </div>

                            <div className='text-right'>
                                <div className='font-bold text-lg text-gray-900 dark:text-white'>
                                    {formatPrice(data.usd)}
                                </div>
                                <div
                                    className={`flex items-center justify-end gap-1 text-sm ${
                                        isPositive
                                            ? 'text-green-500'
                                            : 'text-red-500'
                                    }`}>
                                    {isPositive ? (
                                        <TrendingUp className='w-4 h-4' />
                                    ) : (
                                        <TrendingDown className='w-4 h-4' />
                                    )}
                                    {formatChange(data.usd_24h_change)}
                                </div>
                                <div className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
                                    Cap: {formatMarketCap(data.usd_market_cap)}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className='mt-4 text-xs text-gray-500 dark:text-gray-400 text-center'>
                Данные предоставлены CoinGecko • Обновляется каждые 2 минуты
            </div>
        </div>
    );
}
