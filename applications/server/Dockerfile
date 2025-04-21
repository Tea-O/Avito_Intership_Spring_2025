# Этап сборки
FROM golang:1.24.1-alpine AS builder

# Установка необходимых инструментов и зависимостей для SQLite
RUN apk add --no-cache git gcc musl-dev sqlite-dev

# Установка рабочей директории
WORKDIR /app

# Копируем go.mod и go.sum отдельно для кеширования зависимостей
COPY go.mod go.sum ./

# Загружаем зависимости
RUN go mod download

# Копируем оставшиеся файлы
COPY . .

# Синхронизируем зависимости (важно!)
RUN go mod tidy

# Сборка бинарника
RUN CGO_ENABLED=1 GOOS=linux go build -o main ./cmd/service

# Финальный минимальный образ
FROM alpine:latest

# Устанавливаем SQLite, если он нужен на рантайме
RUN apk add --no-cache sqlite

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем собранный бинарник из стадии сборки
COPY --from=builder /app/main .

# Открываем порт
EXPOSE 8082

# Запуск приложения
CMD ["./main"]
