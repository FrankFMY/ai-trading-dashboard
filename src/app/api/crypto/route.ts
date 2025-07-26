import {
    validateCryptoRequestParams,
    validateCryptoData,
} from '@/lib/validators';
import { retry } from '@/lib/utils';
import { config } from '@/lib/config';
import { SUPPORTED_COINS } from '@/lib/config';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const coins = searchParams.get('coins') || SUPPORTED_COINS;

        // Валидация параметров запроса
        const validationResult = validateCryptoRequestParams({ coins });
        if (!validationResult.success) {
            return Response.json(
                {
                    success: false,
                    error: 'Некорректные параметры запроса',
                    details: validationResult.error.errors,
                },
                { status: 400 }
            );
        }

        // Получение данных с retry логикой
        const data = await retry(
            async () => {
                const response = await fetch(
                    `https://api.coingecko.com/api/v3/simple/price?ids=${coins}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true`,
                    {
                        headers: {
                            Accept: 'application/json',
                            'User-Agent': 'AI-Trading-Dashboard/1.0',
                        },
                        next: { revalidate: 60 }, // Кэшируем на 1 минуту
                    }
                );

                if (!response.ok) {
                    throw new Error(
                        `CoinGecko API error: ${response.status} ${response.statusText}`
                    );
                }

                const responseData = await response.json();

                // Валидация данных от API
                const dataValidation = validateCryptoData(responseData);
                if (!dataValidation.success) {
                    throw new Error('Некорректные данные от CoinGecko API');
                }

                return dataValidation.data;
            },
            config.maxRetries,
            config.retryDelay
        );

        return Response.json({
            success: true,
            data,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('Crypto API Error:', error);

        const errorMessage =
            error instanceof Error ? error.message : 'Неизвестная ошибка';

        return Response.json(
            {
                success: false,
                error: 'Ошибка получения данных о криптовалютах',
                details: errorMessage,
                timestamp: new Date().toISOString(),
            },
            { status: 500 }
        );
    }
}
