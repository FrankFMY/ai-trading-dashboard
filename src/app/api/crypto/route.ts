export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const coins = searchParams.get('coins') || 'bitcoin,ethereum,solana';

    try {
        const response = await fetch(
            `https://api.coingecko.com/api/v3/simple/price?ids=${coins}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true`,
            {
                headers: {
                    Accept: 'application/json',
                },
                next: { revalidate: 60 }, // Кэшируем на 1 минуту
            }
        );

        if (!response.ok) {
            throw new Error(`CoinGecko API error: ${response.status}`);
        }

        const data = await response.json();

        return Response.json({
            success: true,
            data,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('Crypto API Error:', error);
        return Response.json(
            { error: 'Ошибка получения данных о криптовалютах' },
            { status: 500 }
        );
    }
}
