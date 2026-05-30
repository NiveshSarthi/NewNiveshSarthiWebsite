FROM node:22-alpine

WORKDIR /app/backend

ENV NODE_ENV=production
ENV API_PORT=80
ENV API_HOST=0.0.0.0
ENV ADMIN_TOKEN=

COPY package*.json ./
COPY tools ./tools
COPY data ./data

EXPOSE 80

CMD ["node", "tools/backend.mjs"]
