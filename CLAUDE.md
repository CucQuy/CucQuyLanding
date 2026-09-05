# CucQuy Landing — Project Guide

Landing page tiệm bánh (Next.js, static export → nginx). Phục vụ `cucquy.site`.

## Build & deploy
- Build: `npm run build` → thư mục `out/` (static export), nginx serve (xem `Dockerfile`, `nginx.conf`).
- Deploy: **merge nhánh `production` → GitHub Actions build amd64 + push GHCR `cucquy-landing:latest` → keel rollout** (ns `cucquy`).
- **Chỉ chạy production** (không có staging landing) → workflow chỉ trigger nhánh `production`. KHÔNG deploy tay.
- Gate type-check = `npm run build` trong Docker (build lỗi → không deploy).

## BMAD
Product-level BMAD ở `../` (root CucQuy). Landing là phần nhẹ; phần lớn chỉ chỉnh nội dung/UI, làm trực tiếp.
