# Hexlet Chat (React + Vite)

[![Actions Status](https://github.com/AnastasiiaSleptsova/js-react-developer-project-12/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/AnastasiiaSleptsova/js-react-developer-project-12/actions)

Онлайн-чат с каналами и сообщениями в реальном времени на React 19 + Vite. Поддерживает авторизацию, регистрацию, CRUD каналов и сообщений, мультиязычность и уведомления о событиях

## Демо
[https://js-react-developer-project-12-5q3o.onrender.com](https://js-react-developer-project-12-5q3o.onrender.com)

Тестовый вход: `admin / admin` (можно создавать своих пользователей через регистрацию).

## Ключевые фичи
- Реальное время на Socket.IO: синхронные сообщения и каналы.
- Каналы: создание, переименование, удаление, выбор активного канала.
- Сообщения: отправка, редактирование, удаление; фильтр нецензурной лексики (leo-profanity).
- Auth: вход, регистрация, хранение токена, защищённые роуты.
- i18n: переключатель RU/EN, локализация интерфейса.
- UI/UX: Ant Design компоненты, Toastify уведомления.
- Наблюдаемость: интеграция с Rollbar (аналог Sentry) (для prod-сборок).

## Требования
- Node.js ≥ 18 (рекомендуется LTS) и npm ≥ 10.
- `make` (для Linux/macOS); на Windows можно использовать команды ниже без Make.

## Установка
```bash
git clone https://github.com/AnastasiiaSleptsova/js-react-developer-project-12.git
cd js-react-developer-project-12
npm ci          # запустит postinstall и установит frontend зависимости
# или
make install
```

### Переменные окружения
Создай файл `frontend/.env.local` (можно скопировать из `.env.example`):
```
VITE_ROLLBAR_ACCESS_TOKEN=<токен Rollbar для прод-сборок>
VITE_ROLLBAR_ENVIRONMENT=development
```
По-хорошему .env.example нужно добавлять в .gitignore, но для учебного проекта я этого не делала

## Dev режим
Рекомендовано:
```bash
make develop
```

Если `make develop` не срабатывает, процессы можно поднять вручную в двух терминалах:
```bash
# Терминал 1 (фронтенд, порт 5001)
cd frontend && npm run dev

# Терминал 2 (статический сервер, порт 5001, можно изменить через PORT)
npx start-server
```

P.S.
Это приложение, конечно же, можно было сделать и без стейт менеджеров, но я добавила redux-toolkit, чтобы показать, что немного умею с ним работать)

P.P.S.
Бэкенд предоставлен командой Hexlet. К его написанию я не имею отношения. [Документация к бэкенд сервису](https://www.npmjs.com/package/@hexlet/chat-server)