import { useQuery } from '@tanstack/react-query';
import { useCryptoStore } from '@/store';
import { API_ENDPOINTS, SUPPORTED_COINS, config } from '@/lib/config';
import { validateCryptoData } from '@/lib/validators';
import { retry } from '@/lib/utils';
import { UseCryptoDataReturn } from '@/types';

/**
 * Кастомный хук для работы с криптовалютными данными
 */
export function useCryptoData(): UseCryptoDataReturn {
    const { setCryptoData, setLoading, setError, clearError } =
        useCryptoStore();

    const {
        data,
        isLoading,
        error,
        refetch: queryRefetch,
    } = useQuery({
        queryKey: ['crypto', SUPPORTED_COINS],
        queryFn: async () => {
            setLoading(true);
            clearError();

            try {
                const response = await retry(
                    async () => {
                        const res = await fetch(
                            `${API_ENDPOINTS.crypto}?coins=${SUPPORTED_COINS}`,
                            {
                                headers: {
                                    Accept: 'application/json',
                                },
                                next: { revalidate: 60 }, // Кэшируем на 1 минуту
                            }
                        );

                        if (!res.ok) {
                            throw new Error(
                                `HTTP error! status: ${res.status}`
                            );
                        }

                        return res.json();
                    },
                    config.maxRetries,
                    config.retryDelay
                );

                // Валидация данных
                const validationResult = validateCryptoData(response.data);
                if (!validationResult.success) {
                    throw new Error('Некорректные данные от API');
                }

                setCryptoData(validationResult.data);
                return validationResult.data;
            } catch (err) {
                const errorMessage =
                    err instanceof Error ? err.message : 'Неизвестная ошибка';
                setError(errorMessage);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        staleTime: config.cryptoUpdateInterval, // Данные считаются свежими 2 минуты
        gcTime: 5 * 60 * 1000, // Кэш хранится 5 минут
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        retry: config.maxRetries,
        retryDelay: config.retryDelay,
    });

    const refetch = async () => {
        try {
            await queryRefetch();
        } catch (err) {
            console.error('Ошибка при обновлении данных:', err);
        }
    };

    return {
        data: data || null,
        isLoading,
        error: error?.message || null,
        refetch,
    };
}

/**
 * Хук для получения данных конкретной криптовалюты
 */
export function useCoinData(coinId: string) {
    const { data } = useCryptoData();

    if (!data || !data[coinId]) {
        return null;
    }

    return data[coinId];
}

/**
 * Хук для получения списка всех криптовалют
 */
export function useCryptoList() {
    const { data } = useCryptoData();

    if (!data) {
        return [];
    }

    return Object.entries(data).map(([id, coinData]) => ({
        id,
        ...coinData,
    }));
}
