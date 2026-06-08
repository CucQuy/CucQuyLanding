import React from 'react';

const Footer: React.FC = () => (
  <footer className="cq2-footer">
    <div className="cq2-footer-top">
      <div className="cq2-footer-brand">
        <span className="cq2-footer-logo">Cúc Quy</span>
        <span className="cq2-footer-mark">✦ 2025 ✦</span>
      </div>
      <div className="cq2-footer-meta">
        <div>
          <div className="cq2-footer-h">Liên hệ</div>
          <a href="tel:+84776750418">0776 750 418</a>
          <span>Huế, Việt Nam</span>
        </div>
        <div>
          <div className="cq2-footer-h">Menu</div>
          <a href="#menu">Cookies</a>
          <a href="#menu">Brownies</a>
          <a href="#menu">Set quà</a>
        </div>
        <div>
          <div className="cq2-footer-h">Theo dõi</div>
          <a href="https://instagram.com/cucquy.bakery" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://facebook.com/cucquy.bakery" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://tiktok.com/@cucquy.bakery" target="_blank" rel="noopener noreferrer">TikTok</a>
        </div>
      </div>
    </div>
    <div className="cq2-footer-bot">
      <span>© Cúc Quy Bakery — Made with 💗 in Hue</span>
      <a href="https://admin.cucquy.site/login">Đăng nhập</a>
    </div>
  </footer>
);

export default Footer;
