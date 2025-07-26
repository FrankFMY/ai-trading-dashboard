import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { AppState, CryptoData, ChatMessage } from '@/types';

interface CryptoStore extends AppState {
    // Actions
    setCryptoData: (data: CryptoData) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setLastUpdate: (timestamp: string) => void;
    clearError: () => void;
    reset: () => void;
}

interface ChatStore {
    messages: ChatMessage[];
    isLoading: boolean;
    error: string | null;
    input: string;

    // Actions
    addMessage: (message: ChatMessage) => void;
    setMessages: (messages: ChatMessage[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setInput: (input: string) => void;
    clearChat: () => void;
    clearError: () => void;
}

interface ThemeStore {
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;
    toggleTheme: () => void;
}

// Store для криптовалютных данных
export const useCryptoStore = create<CryptoStore>()(
    devtools(
        persist(
            set => ({
                theme: 'light',
                cryptoData: null,
                isLoading: false,
                error: null,
                lastUpdate: null,

                setCryptoData: (data: CryptoData) =>
                    set({
                        cryptoData: data,
                        error: null,
                        lastUpdate: new Date().toISOString(),
                    }),

                setLoading: (loading: boolean) => set({ isLoading: loading }),

                setError: (error: string | null) =>
                    set({
                        error,
                        isLoading: false,
                    }),

                setLastUpdate: (timestamp: string) =>
                    set({ lastUpdate: timestamp }),

                clearError: () => set({ error: null }),

                reset: () =>
                    set({
                        cryptoData: null,
                        isLoading: false,
                        error: null,
                        lastUpdate: null,
                    }),
            }),
            {
                name: 'crypto-store',
                partialize: state => ({
                    cryptoData: state.cryptoData,
                    lastUpdate: state.lastUpdate,
                }),
            }
        ),
        {
            name: 'crypto-store',
        }
    )
);

// Store для чата
export const useChatStore = create<ChatStore>()(
    devtools(
        set => ({
            messages: [],
            isLoading: false,
            error: null,
            input: '',

            addMessage: (message: ChatMessage) =>
                set(state => ({
                    messages: [...state.messages, message],
                    error: null,
                })),

            setMessages: (messages: ChatMessage[]) => set({ messages }),

            setLoading: (loading: boolean) => set({ isLoading: loading }),

            setError: (error: string | null) =>
                set({
                    error,
                    isLoading: false,
                }),

            setInput: (input: string) => set({ input }),

            clearChat: () =>
                set({
                    messages: [],
                    error: null,
                }),

            clearError: () => set({ error: null }),
        }),
        {
            name: 'chat-store',
        }
    )
);

// Store для темы
export const useThemeStore = create<ThemeStore>()(
    devtools(
        persist(
            set => ({
                theme: 'light',

                setTheme: (theme: 'light' | 'dark') => set({ theme }),

                toggleTheme: () =>
                    set(state => ({
                        theme: state.theme === 'light' ? 'dark' : 'light',
                    })),
            }),
            {
                name: 'theme-store',
            }
        ),
        {
            name: 'theme-store',
        }
    )
);

// Селекторы для оптимизации
export const useCryptoData = () => useCryptoStore(state => state.cryptoData);
export const useCryptoLoading = () => useCryptoStore(state => state.isLoading);
export const useCryptoError = () => useCryptoStore(state => state.error);
export const useLastUpdate = () => useCryptoStore(state => state.lastUpdate);

export const useChatMessages = () => useChatStore(state => state.messages);
export const useChatLoading = () => useChatStore(state => state.isLoading);
export const useChatError = () => useChatStore(state => state.error);
export const useChatInput = () => useChatStore(state => state.input);

export const useCurrentTheme = () => useThemeStore(state => state.theme);
