# Deploy Skill

You are executing a production deployment. Follow each phase in order. Do not skip steps.

---

## Phase 1 — Pre-flight Checks

Before touching anything:

1. Confirm you are on the correct branch (should be `main` for production deploys).
2. Confirm the working tree is clean — no uncommitted changes:
   ```bash
   git status
   ```
3. Pull the latest changes:
   ```bash
   git pull origin main
   ```
4. Run the test suite and confirm all pass:
   ```bash
   pnpm test
   ```
   If any tests fail, **stop here** and report to the user. Do not deploy broken code.

---

## Phase 2 — Docker Build & Tag

Build and tag the image(s). Use the git short SHA as the image tag for traceability:

```bash
IMAGE_TAG=$(git rev-parse --short HEAD)
docker build -t <registry>/<image-name>:$IMAGE_TAG -t <registry>/<image-name>:latest .
```

Verify the build succeeded before pushing:

```bash
docker images | grep <image-name>
```

---

## Phase 3 — Push to Registry

```bash
docker push <registry>/<image-name>:$IMAGE_TAG
docker push <registry>/<image-name>:latest
```

Confirm both tags are visible in the registry before proceeding.

---

## Phase 4 — Deploy to Server

### Option A — GitHub Actions (preferred)

Trigger the deploy workflow via the CLI:

```bash
gh workflow run deploy.yml --field tag=$IMAGE_TAG
```

Monitor until complete:

```bash
gh run watch
```

### Option B — Direct SSH

```bash
ssh deploy@<server> "docker pull <registry>/<image-name>:latest && docker compose up -d --no-deps <service-name>"
```

Zero-downtime swap: ensure the service has a health check defined in `docker-compose.yml` so Docker waits for readiness before routing traffic.

---

## Phase 5 — Nginx Reload (if config changed)

If any Nginx config files were modified in this deploy:

```bash
ssh deploy@<server> "nginx -t && systemctl reload nginx"
```

Only reload if `nginx -t` reports syntax OK. If it fails, **do not reload** — report the error.

---

## Phase 6 — Smoke Test

After deploy completes, verify the live service:

1. Check the health endpoint:
   ```bash
   curl -f https://<domain>/health
   ```
2. Check the main page returns HTTP 200:
   ```bash
   curl -o /dev/null -s -w "%{http_code}" https://<domain>/
   ```

If either check fails, immediately proceed to Phase 7 — Rollback.

---

## Phase 7 — Rollback (on failure)

If smoke tests fail or the deploy caused errors:

1. Identify the previous stable tag (the image tag before this deploy).
2. Re-deploy the previous tag:
   ```bash
   ssh deploy@<server> "docker compose up -d --no-deps --image <registry>/<image-name>:<previous-tag> <service-name>"
   ```
3. Re-run the health check to confirm rollback succeeded.
4. Report the failure and the rollback action taken to the user.

---

## Phase 8 — Report

Return a concise deploy summary:

```
## Deploy Report

- Image: <registry>/<image-name>:<tag>
- Deployed at: <timestamp>
- Health check: PASS / FAIL
- Nginx reload: YES / NO / N/A
- Rollback: YES / NO
- Notes: <any issues or observations>
```
