'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatPrice, formatChange, formatMarketCap } from '@/lib/utils';

import { CryptoCardProps } from '@/types';
import { motion } from 'framer-motion';

export default function CryptoCard({ data, coinInfo }: CryptoCardProps) {
    const isPositive = data.usd_24h_change >= 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className='flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'
        >
            <div className='flex items-center gap-3'>
                <div className='w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center'>
                    <span className={`font-bold text-sm ${coinInfo.color}`}>
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
                        isPositive ? 'text-green-500' : 'text-red-500'
                    }`}
                >
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
        </motion.div>
    );
}
