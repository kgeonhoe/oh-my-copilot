---
description: "Use when writing, editing, or reviewing Dockerfile, docker-compose files, or Nginx configs. Enforces multi-stage builds, security hardening, and Nginx conventions."
applyTo: "**/Dockerfile,**/docker-compose*.yml,**/nginx*.conf"
---

# Infrastructure Standards — Docker + Nginx

## 1. Multi-Stage Dockerfiles

Always use multi-stage builds. The final image must contain only the runtime artifact — no build tools, source code, or dev dependencies.

```dockerfile
# Stage 1: Builder
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

# Stage 2: Runtime
FROM node:20-alpine AS runtime
WORKDIR /app
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
USER appuser
EXPOSE 3000
CMD ["node", "server.js"]
```

For Go services:

```dockerfile
FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o server ./cmd/server

FROM gcr.io/distroless/static:nonroot AS runtime
COPY --from=builder /app/server /server
EXPOSE 8080
ENTRYPOINT ["/server"]
```

## 2. Security Rules

- **Non-root user**: Always create and switch to a non-root user in the final stage (`USER appuser`).
- **No secrets in layers**: Never use `ENV SECRET=value` or `COPY .env ./` with real credentials. Inject secrets at runtime via Docker secrets or environment variables from a secrets manager.
- **No `latest` tags**: Pin base images to a specific version (`node:20-alpine`, not `node:latest`).
- **Minimize attack surface**: Use `alpine` or `distroless` base images. Remove package caches after installation (`rm -rf /var/cache/apk/*`).
- **Read-only filesystem**: Where possible, mount the container filesystem as read-only and use explicit volume mounts for writable paths.

## 3. docker-compose Conventions

- Define a `healthcheck` for every service that accepts connections.
- Use named volumes for persistent data — never anonymous volumes.
- Set `restart: unless-stopped` for production services.
- Use `.env` files for non-secret config values; reference secrets from environment-specific override files.

```yaml
services:
  api:
    build:
      context: .
      dockerfile: Dockerfile
    restart: unless-stopped
    environment:
      - PORT=8080
    healthcheck:
      test:
        [
          "CMD",
          "wget",
          "--quiet",
          "--tries=1",
          "--spider",
          "http://localhost:8080/health",
        ]
      interval: 30s
      timeout: 10s
      retries: 3
    depends_on:
      db:
        condition: service_healthy
```

## 4. Nginx Configuration

- **Security headers**: Every `server` block must include:
  ```nginx
  add_header X-Frame-Options "SAMEORIGIN";
  add_header X-Content-Type-Options "nosniff";
  add_header Referrer-Policy "strict-origin-when-cross-origin";
  add_header Content-Security-Policy "default-src 'self'";
  ```
- **Rate limiting**: Define `limit_req_zone` at the `http` level and apply `limit_req` to API locations.
- **Proxy timeouts**: Always set `proxy_connect_timeout`, `proxy_read_timeout`, and `proxy_send_timeout` explicitly on `location` blocks that proxy to upstream services.
- **No server version leakage**: Set `server_tokens off;` in the `http` block.
- **TLS**: Use TLS 1.2+ only. Disable SSLv3 and TLS 1.0/1.1.

```nginx
http {
    server_tokens off;
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

    server {
        listen 443 ssl;
        ssl_protocols TLSv1.2 TLSv1.3;

        add_header X-Frame-Options "SAMEORIGIN";
        add_header X-Content-Type-Options "nosniff";

        location /api/ {
            limit_req zone=api burst=20 nodelay;
            proxy_pass http://backend:8080/;
            proxy_connect_timeout 5s;
            proxy_read_timeout 30s;
            proxy_send_timeout 30s;
        }
    }
}
```

## 5. Health Checks

Every service must expose a `/health` (or `/healthz`) endpoint that returns HTTP 200 when ready. Docker and Nginx upstream checks should target this endpoint.
