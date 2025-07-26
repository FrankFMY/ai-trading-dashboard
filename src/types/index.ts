// Типы для криптовалютных данных
export interface CoinData {
    usd: number;
    usd_24h_change: number;
    usd_market_cap: number;
    usd_24h_vol: number;
}

export interface CryptoData {
    [key: string]: CoinData;
}

// Типы для API ответов
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    timestamp: string;
}

export type CryptoApiResponse = ApiResponse<CryptoData>;

// Типы для ИИ чата
export interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp?: string;
}

export interface ChatState {
    messages: ChatMessage[];
    isLoading: boolean;
    error: string | null;
}

// Типы для конфигурации
export interface AppConfig {
    ollamaBaseUrl: string;
    ollamaModel: string;
    cryptoUpdateInterval: number;
    maxRetries: number;
    retryDelay: number;
}

// Типы для состояния приложения
export interface AppState {
    theme: 'light' | 'dark';
    cryptoData: CryptoData | null;
    isLoading: boolean;
    error: string | null;
    lastUpdate: string | null;
}

// Типы для валидации
export interface CryptoRequestParams {
    coins: string;
}

export interface AiRequestParams {
    messages: ChatMessage[];
    marketData?: CryptoData;
}

// Типы для уведомлений
export interface ToastNotification {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message?: string;
    duration?: number;
}

// Типы для компонентов
export interface CoinInfo {
    name: string;
    symbol: string;
    color: string;
    icon?: string;
}

export interface CryptoCardProps {
    coinId: string;
    data: CoinData;
    coinInfo: CoinInfo;
}

// Типы для хуков
export interface UseCryptoDataReturn {
    data: CryptoData | null;
    isLoading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export interface UseChatReturn {
    messages: ChatMessage[];
    input: string;
    isLoading: boolean;
    error: string | null;
    sendMessage: (message: string) => void;
    clearChat: () => void;
    setInput: (input: string) => void;
}
