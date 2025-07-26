import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { FORMAT_CONFIG } from './config';

/**
 * Объединяет классы CSS с помощью clsx и tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Форматирует цену в USD
 */
export function formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', FORMAT_CONFIG.price).format(price);
}

/**
 * Форматирует изменение цены в процентах
 */
export function formatChange(change: number): string {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(
        FORMAT_CONFIG.percentage.maximumFractionDigits
    )}%`;
}

/**
 * Форматирует рыночную капитализацию
 */
export function formatMarketCap(marketCap: number): string {
    return new Intl.NumberFormat('en-US', FORMAT_CONFIG.marketCap).format(
        marketCap
    );
}

/**
 * Форматирует объем торгов
 */
export function formatVolume(volume: number): string {
    return new Intl.NumberFormat('en-US', FORMAT_CONFIG.marketCap).format(
        volume
    );
}

/**
 * Задержка в миллисекундах
 */
export function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry функция с exponential backoff
 */
export async function retry<T>(
    fn: () => Promise<T>,
    maxRetries: number = 3,
    delayMs: number = 1000
): Promise<T> {
    let lastError: Error;

    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error as Error;
            if (i < maxRetries - 1) {
                await delay(delayMs * Math.pow(2, i)); // exponential backoff
            }
        }
    }

    throw lastError!;
}

/**
 * Проверяет, является ли значение числом
 */
export function isNumber(value: unknown): value is number {
    return typeof value === 'number' && !isNaN(value);
}

/**
 * Проверяет, является ли значение строкой
 */
export function isString(value: unknown): value is string {
    return typeof value === 'string';
}

/**
 * Проверяет, является ли значение объектом
 */
export function isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Безопасно получает значение из объекта по пути
 */
export function getNestedValue(
    obj: Record<string, unknown>,
    path: string
): unknown {
    return path.split('.').reduce((current: unknown, key: string) => {
        return current &&
            typeof current === 'object' &&
            current !== null &&
            key in current
            ? (current as Record<string, unknown>)[key]
            : undefined;
    }, obj);
}

/**
 * Генерирует уникальный ID
 */
export function generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**
 * Форматирует дату в читаемом виде
 */
export function formatDate(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleString('ru-RU', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

/**
 * Форматирует время в относительном виде
 */
export function formatRelativeTime(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diff = now.getTime() - d.getTime();

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'только что';
    if (minutes < 60) return `${minutes} мин назад`;
    if (hours < 24) return `${hours} ч назад`;
    if (days < 7) return `${days} дн назад`;

    return formatDate(d);
}

/**
 * Обрезает текст до указанной длины
 */
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
}

/**
 * Проверяет, поддерживается ли темная тема
 */
export function supportsDarkMode(): boolean {
    return (
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
    );
}

/**
 * Получает текущую тему
 */
export function getCurrentTheme(): 'light' | 'dark' {
    if (typeof window === 'undefined') return 'light';

    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) return savedTheme;

    return supportsDarkMode() ? 'dark' : 'light';
}

/**
 * Устанавливает тему
 */
export function setTheme(theme: 'light' | 'dark'): void {
    if (typeof window === 'undefined') return;

    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
}

/**
 * Копирует текст в буфер обмена
 */
export async function copyToClipboard(text: string): Promise<boolean> {
    try {
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(text);
            return true;
        } else {
            // Fallback для старых браузеров
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return true;
        }
    } catch (error) {
        console.error('Ошибка копирования в буфер обмена:', error);
        return false;
    }
}
