# Deploy Landing (Next.js static) lên VPS — Hướng dẫn A→Z

Landing build tĩnh (Next.js `output: export` → thư mục `out/`), serve bằng nginx trong Docker,
sau nginx host reverse-proxy + HTTPS. Domain: **`cucquy.site`** (root — SEO chính).

```
Trình duyệt ── HTTPS ──▶ nginx (VPS) ──▶ container cucquy-landing (127.0.0.1:8090, nginx serve out/)
                cucquy.site
```
Cổng đã dùng trên VPS: BE `3000` · FE(admin) `8080` · **Landing `8090`**.

---

## 0. Tạo GitHub repo + push (máy local)
```bash
cd /Users/tonthatanhminh/Desktop/Code/CucQuy/landing
git branch -M main
git remote add origin https://github.com/rice2411/CucQuyLanding.git   # tạo repo trống này trên GitHub trước
git push -u origin main
```

## 1. DNS — trỏ cucquy.site về VPS
Đổi A record (đang trỏ Vercel) sang VPS:
```
A    @      45.117.179.222
A    www    45.117.179.222   (tùy chọn)
```
Verify (đợi tới khi ra IP VPS):
```bash
dig +short cucquy.site @8.8.8.8      # → 45.117.179.222
```
⚠️ Bước này "rời Vercel" — cucquy.site từ đây phục vụ bởi VPS.

## 2. Clone + build + chạy (trên VPS)
```bash
cd /root/cucquy
git clone https://github.com/rice2411/CucQuyLanding.git landing
cd landing
docker build -t cucquy-landing .
docker run -d --name cucquy-landing --restart unless-stopped -p 127.0.0.1:8090:80 cucquy-landing
docker ps | grep cucquy-landing                 # Up, 127.0.0.1:8090->80
curl -s http://127.0.0.1:8090 | grep -o "<title>[^<]*</title>"
```

## 3. Nginx + HTTPS cho cucquy.site
Tạo server block (nano):
```bash
nano /etc/nginx/sites-available/landing
```
```nginx
server {
    listen 80;
    server_name cucquy.site www.cucquy.site;
    location / {
        proxy_pass http://127.0.0.1:8090;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
```bash
ln -sf /etc/nginx/sites-available/landing /etc/nginx/sites-enabled/landing
nginx -t && systemctl reload nginx
certbot --nginx -d cucquy.site -d www.cucquy.site      # chọn 2 (redirect HTTP→HTTPS)
```

> ⚠️ Nếu file `/etc/nginx/sites-available/web` (admin FE) còn `server_name` chứa `cucquy.site`, BỎ nó đi (chỉ để `admin.cucquy.site`), tránh tranh domain với landing:
> ```bash
> # sửa block của web: server_name admin.cucquy.site;  (bỏ cucquy.site)
> nginx -t && systemctl reload nginx
> ```

## 4. Test
```bash
curl -sI https://cucquy.site | head -1          # HTTP/2 200
```
Mở `https://cucquy.site` → landing hiển thị. Nút Đăng nhập/CTA → `https://admin.cucquy.site`.

## 5. Kiểm SEO (sau khi live)
- `https://cucquy.site/sitemap.xml` và `/robots.txt` truy cập được.
- Google Search Console → thêm property `cucquy.site` → submit sitemap.
- Test rich result: https://search.google.com/test/rich-results (kiểm JSON-LD Bakery).
- Share thử lên Facebook/Zalo xem OG image (thay `og-image` thật 1200×630 nếu cần).

---

## Cập nhật code sau này
```bash
cd /root/cucquy/landing
git pull origin main
docker build -t cucquy-landing .
docker stop cucquy-landing && docker rm cucquy-landing
docker run -d --name cucquy-landing --restart unless-stopped -p 127.0.0.1:8090:80 cucquy-landing
docker image prune -f
```

## Lỗi thường gặp
- **certbot NXDOMAIN** → DNS cucquy.site chưa trỏ VPS. `dig +short cucquy.site @8.8.8.8` ra IP rồi mới chạy.
- **cucquy.site vẫn ra trang cũ (Vercel)** → DNS chưa cập nhật / cache. Đợi propagate, xoá cache trình duyệt.
- **404** → block nginx landing chưa có `server_name cucquy.site`, hoặc bị block `web` (admin) giành mất domain. Xem mục ⚠️ ở bước 3.
- **Build OOM trên VPS** (RAM 1.4GB) → thêm swap (xem backend/SERVER-OPS.md), hoặc build image ở máy khác.

## Ghi chú
- Landing tĩnh hoàn toàn → image nhẹ (nginx + HTML), không cần Node runtime.
- Nội dung sửa trong code → build lại image (Vite/Next inline lúc build).
- SSL Let's Encrypt miễn phí, tự gia hạn.
