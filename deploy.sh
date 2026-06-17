#!/usr/bin/env bash
#
# deploy.sh — Build local (Colima/docker) → push GHCR → keel tự rollout trên k3s.
#
# Image: ghcr.io/cucquy/cucquy-landing  (Next static export → nginx)
# Landing KHÔNG có build-arg API (next build static, không inline API URL).
#
# Dùng:
#   ./deploy.sh              # build + push :latest và :<sha>  → keel rollout prod
#   ./deploy.sh --no-latest  # CHỈ build + push :<sha> (KHÔNG đụng :latest). Dùng test pipeline.
#
# Creds: GHCR_TOKEN (PAT write:packages) hoặc `gh auth token`; GHCR_USER tuỳ chọn.
#
set -euo pipefail

IMAGE="ghcr.io/cucquy/cucquy-landing"
VPS="rice@ssh.ricevps.xyz"
DEPLOY_DIR="~/deploys/cucquy-landing"

PUSH_LATEST=1
for arg in "$@"; do
  case "$arg" in
    --no-latest) PUSH_LATEST=0 ;;
    -h|--help)   sed -n '2,15p' "$0"; exit 0 ;;
    *) echo "❌ Tham số lạ: $arg" >&2; exit 1 ;;
  esac
done

cd "$(dirname "$0")"

red()   { printf '\033[31m%s\033[0m\n' "$*"; }
green() { printf '\033[32m%s\033[0m\n' "$*"; }
blue()  { printf '\033[34m%s\033[0m\n' "$*"; }

# ── 1. Docker / Colima ──
if ! docker info >/dev/null 2>&1; then
  red "❌ Docker daemon không phản hồi (Colima chưa chạy?). Chạy: colima start"
  exit 1
fi
green "✓ Docker OK"

# ── 2. Gate chất lượng: next build (gồm type-check) — chạy trong docker build luôn,
#       nhưng build thử local trước cho fail nhanh nếu node_modules có. ──
if [ ! -d node_modules ]; then
  blue "→ npm ci..."
  npm ci
fi
blue "→ next build (gate)..."
npm run build
green "✓ Build (gate) pass"

# ── 3. Commit ──
SHA="$(git rev-parse --short HEAD)"
FULL_SHA="$(git rev-parse HEAD)"
MSG="$(git log -1 --pretty=format:'%s')"
AUTHOR="$(git log -1 --pretty=format:'%an')"
TIME="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
blue "→ Commit: $SHA  ($MSG)"

# ── 4. Login GHCR ──
GHCR_USER="${GHCR_USER:-$(git config user.name 2>/dev/null | tr '[:upper:] ' '[:lower:]_')}"
GHCR_USER="${GHCR_USER:-cucquy}"
TOKEN="${GHCR_TOKEN:-}"
if [ -z "$TOKEN" ] && command -v gh >/dev/null 2>&1; then
  TOKEN="$(gh auth token 2>/dev/null || true)"
fi
if [ -z "$TOKEN" ]; then
  red "❌ Không có GHCR credentials. export GHCR_TOKEN=<PAT write:packages> hoặc gh auth login."
  exit 1
fi
blue "→ docker login ghcr.io (user: $GHCR_USER)..."
echo "$TOKEN" | docker login ghcr.io -u "$GHCR_USER" --password-stdin
green "✓ Login GHCR OK"

# ── 5. Build image ──
TAGS=(-t "$IMAGE:$SHA")
if [ "$PUSH_LATEST" -eq 1 ]; then TAGS+=(-t "$IMAGE:latest"); fi
blue "→ docker build..."
docker build "${TAGS[@]}" .
green "✓ Build OK"

# ── 6. Push ──
blue "→ docker push $IMAGE:$SHA"
docker push "$IMAGE:$SHA"
if [ "$PUSH_LATEST" -eq 1 ]; then
  blue "→ docker push $IMAGE:latest"
  docker push "$IMAGE:latest"
fi
green "✓ Push OK"

# ── 7. Record lên VPS ──
KIND="deploy"; [ "$PUSH_LATEST" -eq 1 ] || KIND="test"
RECORD=$(printf '{"commit":"%s","short":"%s","message":%s,"author":%s,"time":"%s","image":"%s:%s","status":"pushed","kind":"%s"}' \
  "$FULL_SHA" "$SHA" \
  "$(printf '%s' "$MSG" | python3 -c 'import json,sys; print(json.dumps(sys.stdin.read()))')" \
  "$(printf '%s' "$AUTHOR" | python3 -c 'import json,sys; print(json.dumps(sys.stdin.read()))')" \
  "$TIME" "$IMAGE" "$SHA" "$KIND")
blue "→ Ghi record deploy lên VPS..."
if printf '%s\n' "$RECORD" | ssh -o ConnectTimeout=10 "$VPS" "mkdir -p $DEPLOY_DIR && cat >> $DEPLOY_DIR/history.jsonl"; then
  green "✓ Record ($KIND) → $DEPLOY_DIR/history.jsonl"
else
  red "⚠ Không ghi được record (push vẫn OK)."
fi

echo
if [ "$PUSH_LATEST" -eq 1 ]; then
  green "🚀 Đã push :latest và :$SHA. Keel rollout deploy/landing trong ~1 phút."
  echo "   Xem:  ssh $VPS kubectl -n cucquy rollout status deploy/landing"
else
  green "🧪 Đã push CHỈ :$SHA (KHÔNG đụng :latest). Prod giữ nguyên."
fi
