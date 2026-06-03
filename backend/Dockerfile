FROM node:22-alpine

WORKDIR /app/backend

ENV NODE_ENV=production
ENV API_PORT=3000
ENV API_HOST=0.0.0.0
ENV ADMIN_USERNAME=admin
ENV ADMIN_PASSWORD=
ENV ADMIN_TOKEN=

COPY package*.json ./
RUN npm install --omit=dev
COPY tools ./tools
COPY data ./data
COPY data ./seed-data

EXPOSE 3000

CMD ["node", "tools/backend.mjs"]
