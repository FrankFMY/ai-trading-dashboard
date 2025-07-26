import { z } from 'zod';

// Схема для валидации криптовалютных данных
export const coinDataSchema = z.object({
    usd: z.number().positive(),
    usd_24h_change: z.number(),
    usd_market_cap: z.number().positive(),
    usd_24h_vol: z.number().positive(),
});

export const cryptoDataSchema = z.record(z.string(), coinDataSchema);

// Схема для валидации API ответов
export const apiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
    z.object({
        success: z.boolean(),
        data: dataSchema.optional(),
        error: z.string().optional(),
        timestamp: z.string().datetime(),
    });

export const cryptoApiResponseSchema = apiResponseSchema(cryptoDataSchema);

// Схема для валидации сообщений чата
export const chatMessageSchema = z.object({
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string().min(1).max(1000),
    timestamp: z.string().optional(), // Убрал .datetime() так как используем ISO string
});

export const chatMessagesSchema = z.array(chatMessageSchema);

// Схема для валидации параметров запросов
export const cryptoRequestParamsSchema = z.object({
    coins: z.string().min(1),
});

export const aiRequestParamsSchema = z.object({
    messages: chatMessagesSchema,
    marketData: cryptoDataSchema.optional(),
});

// Схема для валидации конфигурации
export const appConfigSchema = z.object({
    ollamaBaseUrl: z.string().url(),
    ollamaModel: z.string().min(1),
    cryptoUpdateInterval: z.number().positive(),
    maxRetries: z.number().int().min(1).max(10),
    retryDelay: z.number().positive(),
});

// Схема для валидации уведомлений
export const toastNotificationSchema = z.object({
    id: z.string(),
    type: z.enum(['success', 'error', 'warning', 'info']),
    title: z.string().min(1),
    message: z.string().optional(),
    duration: z.number().positive().optional(),
});

// Функции для валидации
export function validateCryptoData(data: unknown) {
    return cryptoDataSchema.safeParse(data);
}

export function validateApiResponse<T>(
    response: unknown,
    dataSchema: z.ZodType<T>
) {
    return apiResponseSchema(dataSchema).safeParse(response);
}

export function validateChatMessage(message: unknown) {
    return chatMessageSchema.safeParse(message);
}

export function validateCryptoRequestParams(params: unknown) {
    return cryptoRequestParamsSchema.safeParse(params);
}

export function validateAiRequestParams(params: unknown) {
    return aiRequestParamsSchema.safeParse(params);
}

export function validateAppConfig(config: unknown) {
    return appConfigSchema.safeParse(config);
}

export function validateToastNotification(notification: unknown) {
    return toastNotificationSchema.safeParse(notification);
}

// Типы для использования в коде
export type ValidatedCryptoData = z.infer<typeof cryptoDataSchema>;
export type ValidatedChatMessage = z.infer<typeof chatMessageSchema>;
export type ValidatedCryptoRequestParams = z.infer<
    typeof cryptoRequestParamsSchema
>;
export type ValidatedAiRequestParams = z.infer<typeof aiRequestParamsSchema>;
export type ValidatedAppConfig = z.infer<typeof appConfigSchema>;
export type ValidatedToastNotification = z.infer<
    typeof toastNotificationSchema
>;
