# 🤖 AI Трейдинг Дашборд

<div align="center">

![AI Trading Dashboard Preview](preview.png)

[![Next.js](https://img.shields.io/badge/Next.js-15.4.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Ollama](https://img.shields.io/badge/Ollama-Local_AI-FF6B35?style=for-the-badge&logo=ollama)](https://ollama.ai/)
[![Prettier](https://img.shields.io/badge/Prettier-Code_Formatter-F7B93E?style=for-the-badge&logo=prettier)](https://prettier.io/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**Современный веб-интерфейс для анализа криптовалютных рынков с использованием локального ИИ (Llama 3.2 Vision) и актуальных данных о ценах.**

[🌐 Демо](https://ai-trading-dashboard.vercel.app) • [📖 Документация](#документация) • [🚀 Быстрый старт](#быстрый-старт) • [🐛 Issues](https://github.com/FrankFMY/ai-trading-dashboard/issues)

</div>

---

## ✨ Возможности

- 🤖 **Локальный ИИ**: Полная приватность данных с использованием Ollama и Llama 3.2 Vision
- 📊 **Актуальные данные**: Интеграция с CoinGecko API для получения реальных цен криптовалют
- 💬 **Интерактивный чат**: Задавайте вопросы о рынке и получайте профессиональные рекомендации
- 🎨 **Красивый UI**: Современный интерфейс с поддержкой темной темы
- ⚡ **Автообновление**: Данные обновляются каждые 2 минуты
- 📱 **Адаптивный дизайн**: Отлично работает на всех устройствах
- 🔧 **Современная разработка**: TypeScript, ESLint, Prettier, Jest тесты
- 🚀 **Готов к продакшену**: Оптимизированная сборка и CI/CD готовность

## 🚀 Быстрый старт

### Предварительные требования

- Node.js 18+
- Ollama
- Git

### Известные проблемы и решения

- **Ошибка гидратации**: Исправлена проблема с несоответствием серверного и клиентского рендеринга в компоненте CryptoPrices
- **Временные метки**: Время обновления данных теперь корректно отображается без ошибок гидратации
- **CI/CD сборка**: Исправлены проблемы с устаревшими опциями Next.js конфигурации и отсутствующим модулем critters

### Установка и запуск

```bash
# 1. Клонирование репозитория
git clone https://github.com/FrankFMY/ai-trading-dashboard.git
cd ai-trading-dashboard

# 2. Установка зависимостей
npm install

# 3. Настройка Ollama
ollama pull llama3.2-vision:11b
ollama serve

# 4. Запуск приложения
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

### Разработка

```bash
# Форматирование кода
npm run format

# Проверка форматирования
npm run format:check

# Линтинг
npm run lint

# Исправление ошибок линтера
npm run lint:fix

# Проверка типов
npm run type-check

# Запуск тестов
npm run test

# Тесты в режиме наблюдения
npm run test:watch

# Покрытие тестами
npm run test:coverage
```

## 🏗️ Архитектура

### Технологический стек

- **Frontend**: Next.js 15.4.4 + TypeScript + Tailwind CSS 4.0
- **AI**: Ollama API с моделью llama3.2-vision:11b
- **Data**: CoinGecko API для криптовалютных данных
- **State Management**: Zustand + React Query
- **UI**: Radix UI, Lucide React иконки, React Markdown
- **Code Quality**: ESLint, Prettier, Jest
- **Styling**: Tailwind CSS, Framer Motion

### Структура проекта

```
ai-trading-dashboard/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── ai/route.ts          # AI API endpoint
│   │   │   └── crypto/route.ts      # Crypto data API
│   │   ├── globals.css              # Глобальные стили
│   │   ├── layout.tsx               # Layout приложения
│   │   └── page.tsx                 # Главная страница
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Toast.tsx            # Toast компонент
│   │   │   ├── Toaster.tsx          # Toast контейнер
│   │   │   └── useToast.ts          # Toast хук
│   │   ├── AIChat.tsx               # AI чат компонент
│   │   ├── CryptoCard.tsx           # Карточка криптовалюты
│   │   ├── CryptoPrices.tsx         # Список цен криптовалют
│   │   └── Providers.tsx            # Провайдеры (React Query)
│   ├── hooks/
│   │   ├── useChat.ts               # Хук для чата с ИИ
│   │   └── useCryptoData.ts         # Хук для данных криптовалют
│   ├── lib/
│   │   ├── config.ts                # Конфигурация
│   │   ├── utils.ts                 # Утилиты
│   │   └── validators.ts            # Валидация
│   ├── store/
│   │   └── index.ts                 # Zustand store
│   └── types/
│       └── index.ts                 # TypeScript типы
├── .vscode/                         # Настройки VS Code
├── .github/                         # GitHub Actions
├── public/                          # Статические файлы
├── .prettierrc                      # Конфигурация Prettier
├── .prettierignore                  # Исключения Prettier
├── eslint.config.mjs                # Конфигурация ESLint
├── tsconfig.json                    # Конфигурация TypeScript
├── next.config.ts                   # Конфигурация Next.js
├── postcss.config.mjs               # Конфигурация PostCSS
├── README.md                        # Документация
├── QUICKSTART.md                    # Быстрый старт
├── TESTING.md                       # Тестирование
├── ROADMAP.md                       # Планы развития
├── PROJECT_SUMMARY.md               # Описание проекта
└── REFACTORING_REPORT.md            # Отчет о рефакторинге
```

## 💡 Примеры использования

### Вопросы для ИИ:

- "Проанализируй текущую ситуацию с Bitcoin"
- "Какие торговые сигналы ты видишь для Ethereum?"
- "Сравни Bitcoin и Solana - что лучше покупать?"
- "Дай рекомендации по портфелю из топ-5 криптовалют"
- "Анализируй уровни поддержки и сопротивления"

## 🔧 Конфигурация

### Переменные окружения

Создайте файл `.env.local`:

```env
# URL Ollama API (по умолчанию: http://localhost:11434/api)
OLLAMA_BASE_URL=http://localhost:11434/api

# Модель для использования
OLLAMA_MODEL=llama3.2-vision:11b
```

### Настройка криптовалют

В файле `src/components/CryptoPrices.tsx`:

```typescript
const COIN_INFO = {
    bitcoin: { name: 'Bitcoin', symbol: 'BTC', color: 'text-orange-500' },
    ethereum: { name: 'Ethereum', symbol: 'ETH', color: 'text-blue-500' },
    // Добавьте свои криптовалюты
};
```

## 🧪 Тестирование

В проекте реализован базовый smoke-тест (`src/__tests__/smoke.test.ts`), который гарантирует корректную настройку тестовой среды и успешное прохождение CI/CD pipeline даже при отсутствии бизнес-логики тестов.

Для запуска тестов используйте:

```bash
npm test
```

Если вы добавляете новые модули, обязательно покрывайте их тестами. Smoke-тест не заменяет полноценное тестирование бизнес-логики.

Подробная информация о тестировании в [TESTING.md](TESTING.md).

## 🚀 Развертывание

### Локальное развертывание

```bash
npm run build
npm start
```

### Облачное развертывание

#### Vercel (рекомендуется)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/FrankFMY/ai-trading-dashboard)

1. Подключите репозиторий к Vercel
2. Настройте переменные окружения
3. Убедитесь, что Ollama доступен

#### Netlify

```bash
npm run build
# Загрузите папку .next в Netlify
```

## 🔍 Отладка

### Проверка Ollama

```bash
# Проверка статуса
curl http://localhost:11434/api/tags

# Тестовый запрос
curl -X POST http://localhost:11434/api/generate \
  -H "Content-Type: application/json" \
  -d '{"model": "llama3.2-vision:11b", "prompt": "Hello"}'
```

### Логи приложения

```bash
# Запуск с подробными логами
DEBUG=* npm run dev
```

## 📊 Мониторинг

Приложение автоматически:

- Обновляет данные о криптовалютах каждые 2 минуты
- Логирует ошибки в консоль
- Показывает статус подключения к Ollama

## 🤝 Вклад в проект

Мы приветствуем вклад сообщества!

### Требования к коду

- Следуйте стандартам кодирования (ESLint + Prettier)
- Добавляйте тесты для новых функций
- Обновляйте документацию при необходимости
- Используйте TypeScript для всех новых файлов

### Процесс разработки

1. [Fork](https://github.com/FrankFMY/ai-trading-dashboard/fork) репозитория
2. Создайте ветку для новой функции (`git checkout -b feature/amazing-feature`)
3. Внесите изменения и закоммитьте (`git commit -m 'Add amazing feature'`)
4. Убедитесь, что все тесты проходят (`npm run test`)
5. Проверьте форматирование (`npm run format:check`)
6. Push в ветку (`git push origin feature/amazing-feature`)
7. Откройте [Pull Request](https://github.com/FrankFMY/ai-trading-dashboard/pulls)

## 📄 Лицензия

Этот проект лицензирован под MIT License - см. файл [LICENSE](LICENSE) для деталей.

## 👨‍💻 Автор

**Артём Прянишников**

- 📧 Email: [pryanishnikovartem@gmail.com](mailto:pryanishnikovartem@gmail.com)
- 🌐 GitHub: [@FrankFMY](https://github.com/FrankFMY)
- 📱 Telegram: [@FrankFMY](https://t.me/FrankFMY)

## 🆘 Поддержка

При возникновении проблем:

1. Проверьте, что Ollama запущен и доступен
2. Убедитесь, что модель `llama3.2-vision:11b` установлена
3. Проверьте логи в консоли браузера
4. Запустите тесты: `npm run test`
5. Создайте [Issue](https://github.com/FrankFMY/ai-trading-dashboard/issues) с описанием проблемы

## 📚 Дополнительная документация

- [QUICKSTART.md](QUICKSTART.md) - Быстрый старт
- [TESTING.md](TESTING.md) - Руководство по тестированию
- [ROADMAP.md](ROADMAP.md) - Планы развития
- [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Описание проекта
- [REFACTORING_REPORT.md](REFACTORING_REPORT.md) - Отчет о рефакторинге

## ⚠️ Отказ от ответственности

Это демонстрационный проект для образовательных целей. Не используйте его для принятия реальных торговых решений без дополнительного анализа. Автор не несет ответственности за любые финансовые потери.

---

<div align="center">

⭐ **Если проект вам понравился, поставьте звезду!** ⭐

[![GitHub stars](https://img.shields.io/github/stars/FrankFMY/ai-trading-dashboard?style=social)](https://github.com/FrankFMY/ai-trading-dashboard/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/FrankFMY/ai-trading-dashboard?style=social)](https://github.com/FrankFMY/ai-trading-dashboard/network)
[![GitHub issues](https://img.shields.io/github/issues/FrankFMY/ai-trading-dashboard)](https://github.com/FrankFMY/ai-trading-dashboard/issues)

</div>
