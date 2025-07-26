import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    // Безопасность
    poweredByHeader: false,
    compress: true,

    // Заголовки безопасности
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin',
                    },
                ],
            },
        ];
    },

    // Обработка изображений
    images: {
        domains: [],
        formats: ['image/webp', 'image/avif'],
    },
};

export default nextConfig;
