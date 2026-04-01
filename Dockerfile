# Stage 1: Build
FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

# Stage 2: Production
FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy only the built output and production dependencies
COPY --from=builder /app/.output ./output

EXPOSE 3000

CMD ["node", "output/server/index.mjs"]
