import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/Toaster';
import { Providers } from '@/components/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'AI Трейдинг Дашборд',
    description:
        'Современный веб-интерфейс для анализа криптовалютных рынков с использованием локального ИИ',
    keywords: [
        'криптовалюты',
        'трейдинг',
        'ИИ',
        'анализ',
        'биткоин',
        'эфириум',
    ],
    authors: [{ name: 'Артём Прянишников' }],
    creator: 'Артём Прянишников',
    publisher: 'AI Trading Dashboard',
    robots: 'index, follow',
    openGraph: {
        type: 'website',
        locale: 'ru_RU',
        url: 'https://ai-trading-dashboard.vercel.app',
        title: 'AI Трейдинг Дашборд',
        description:
            'Современный веб-интерфейс для анализа криптовалютных рынков с использованием локального ИИ',
        siteName: 'AI Trading Dashboard',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AI Трейдинг Дашборд',
        description:
            'Современный веб-интерфейс для анализа криптовалютных рынков с использованием локального ИИ',
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#3B82F6',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='ru' suppressHydrationWarning>
            <body className={inter.className}>
                <Providers>
                    {children}
                    <Toaster />
                </Providers>
            </body>
        </html>
    );
}
