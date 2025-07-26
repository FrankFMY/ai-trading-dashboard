import { AppConfig } from '@/types';

// Конфигурация приложения
export const config: AppConfig = {
    ollamaBaseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434/api',
    ollamaModel: process.env.OLLAMA_MODEL || 'llama3.2-vision:11b',
    cryptoUpdateInterval: 120000, // 2 минуты
    maxRetries: 3,
    retryDelay: 1000,
};

// Конфигурация криптовалют
export const COIN_INFO = {
    bitcoin: {
        name: 'Bitcoin',
        symbol: 'BTC',
        color: 'text-orange-500',
        icon: '₿',
    },
    ethereum: {
        name: 'Ethereum',
        symbol: 'ETH',
        color: 'text-blue-500',
        icon: 'Ξ',
    },
    solana: {
        name: 'Solana',
        symbol: 'SOL',
        color: 'text-purple-500',
        icon: '◎',
    },
    cardano: {
        name: 'Cardano',
        symbol: 'ADA',
        color: 'text-blue-600',
        icon: '₳',
    },
    polkadot: {
        name: 'Polkadot',
        symbol: 'DOT',
        color: 'text-pink-500',
        icon: '●',
    },
} as const;

// Список поддерживаемых криптовалют
export const SUPPORTED_COINS = Object.keys(COIN_INFO).join(',');

// API endpoints
export const API_ENDPOINTS = {
    crypto: '/api/crypto',
    ai: '/api/ai',
} as const;

// Сообщения об ошибках
export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Ошибка соединения с сервером',
    API_ERROR: 'Ошибка получения данных',
    AI_ERROR: 'Ошибка обработки запроса ИИ',
    VALIDATION_ERROR: 'Некорректные данные',
    RATE_LIMIT_ERROR: 'Слишком много запросов',
} as const;

// Сообщения успеха
export const SUCCESS_MESSAGES = {
    DATA_UPDATED: 'Данные успешно обновлены',
    MESSAGE_SENT: 'Сообщение отправлено',
    CHAT_CLEARED: 'Чат очищен',
} as const;

// Настройки UI
export const UI_CONFIG = {
    toastDuration: 5000,
    maxMessageLength: 1000,
    maxRetries: 3,
    retryDelay: 1000,
} as const;

// Промпт для ИИ
export const AI_SYSTEM_PROMPT = `Ты опытный трейдинг-аналитик и финансовый советник. 
Анализируй рыночные данные криптовалют и давай профессиональные торговые рекомендации.

Учитывай:
- Текущие цены и изменения
- Технические индикаторы
- Рыночные тренды
- Объемы торгов
- Уровни поддержки и сопротивления

Отвечай структурированно с разделами:
📈 **Анализ рынка**
🎯 **Торговые сигналы** 
⚠️ **Риски**
💡 **Рекомендации**

Всегда предупреждай о рисках и не давай финансовых советов без оговорок.`;

// Настройки форматирования
export const FORMAT_CONFIG = {
    price: {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 8,
    },
    marketCap: {
        style: 'currency',
        currency: 'USD',
        notation: 'compact',
        compactDisplay: 'short',
    },
    percentage: {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    },
} as const;
