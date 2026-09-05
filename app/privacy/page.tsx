import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chính sách quyền riêng tư — Tiệm bánh Cúc Quy',
  description:
    'Cách Tiệm bánh Cúc Quy thu thập, sử dụng và bảo vệ thông tin của khách hàng khi đặt bánh và nhắn tin với tiệm.',
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
};

/** Ngày cập nhật hiển thị cuối trang — sửa tay khi nội dung chính sách thay đổi. */
const UPDATED_AT = '05/09/2026';

const SECTIONS: { title: string; body: string[] }[] = [
  {
    title: '1. Chúng tôi thu thập thông tin gì',
    body: [
      'Khi bạn đặt bánh: họ tên, số điện thoại, địa chỉ nhận hàng và nội dung ghi chú cho đơn — dùng để làm bánh và giao đúng người, đúng nơi.',
      'Khi bạn nhắn tin cho tiệm qua Facebook Messenger, Instagram hoặc Zalo: tên hiển thị, ảnh đại diện và nội dung tin nhắn bạn gửi — dùng để trả lời và chăm sóc bạn.',
      'Khi bạn bình luận trên trang Facebook/Instagram của tiệm: tên hiển thị và nội dung bình luận.',
      'Chúng tôi KHÔNG thu thập thông tin thẻ ngân hàng. Thanh toán chuyển khoản đi thẳng qua ngân hàng của bạn, tiệm chỉ nhận thông báo số tiền và nội dung chuyển khoản.',
    ],
  },
  {
    title: '2. Dùng thông tin để làm gì',
    body: [
      'Xử lý đơn hàng: làm bánh, đóng gói, giao hàng và xuất hoá đơn khi bạn yêu cầu.',
      'Liên lạc với bạn về đơn hàng: xác nhận đơn, báo thời gian giao, xử lý khiếu nại.',
      'Trả lời tin nhắn và bình luận của bạn trên các kênh của tiệm.',
      'Gửi thông tin khuyến mãi qua Zalo hoặc Messenger — chỉ khi bạn đã nhắn tin cho tiệm trước và không từ chối nhận tin.',
    ],
  },
  {
    title: '3. Chia sẻ thông tin',
    body: [
      'Chúng tôi KHÔNG bán, KHÔNG trao đổi thông tin của bạn cho bên thứ ba vì mục đích quảng cáo.',
      'Chỉ chia sẻ khi cần thiết để hoàn thành đơn của bạn: đơn vị vận chuyển (tên, số điện thoại, địa chỉ nhận) và ngân hàng xử lý thanh toán.',
      'Chúng tôi có thể cung cấp thông tin cho cơ quan nhà nước có thẩm quyền nếu pháp luật yêu cầu.',
    ],
  },
  {
    title: '4. Lưu trữ và bảo mật',
    body: [
      'Thông tin đơn hàng được lưu trong hệ thống quản lý riêng của tiệm, truy cập bằng tài khoản có phân quyền; chỉ chủ tiệm và nhân viên phụ trách mới xem được.',
      'Dữ liệu truyền đi được mã hoá qua HTTPS.',
      'Thông tin đơn hàng được giữ trong thời gian cần thiết cho việc bán hàng, bảo hành chất lượng và nghĩa vụ kế toán.',
    ],
  },
  {
    title: '5. Quyền của bạn',
    body: [
      'Yêu cầu xem lại thông tin mà tiệm đang lưu về bạn.',
      'Yêu cầu sửa thông tin sai (tên, số điện thoại, địa chỉ).',
      'Yêu cầu xoá thông tin của bạn khỏi hệ thống, trừ phần bắt buộc phải giữ theo quy định kế toán.',
      'Từ chối nhận tin khuyến mãi bất cứ lúc nào — chỉ cần nhắn "ngừng nhận tin" cho tiệm.',
      'Để thực hiện các quyền trên, liên hệ theo thông tin ở cuối trang; tiệm phản hồi trong vòng 7 ngày làm việc.',
    ],
  },
  {
    title: '6. Cookie và số liệu truy cập',
    body: [
      'Website này không đặt cookie theo dõi quảng cáo.',
      'Trang quản trị nội bộ của tiệm dùng cookie đăng nhập để giữ phiên làm việc của nhân viên.',
    ],
  },
  {
    title: '7. Thay đổi chính sách',
    body: [
      'Khi có thay đổi, bản cập nhật sẽ được đăng ngay tại trang này kèm ngày cập nhật mới.',
    ],
  },
];

/**
 * Trang chính sách quyền riêng tư — bắt buộc để khai báo với Meta (Facebook/Instagram)
 * khi app kết nối tin nhắn và bình luận của fanpage.
 */
export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16 text-neutral-800">
      <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
        Chính sách quyền riêng tư
      </h1>
      <p className="mt-3 text-sm text-neutral-500">
        Áp dụng cho khách hàng của Tiệm bánh Cúc Quy khi đặt bánh, nhắn tin và tương tác với các
        kênh của tiệm.
      </p>

      <div className="mt-10 space-y-9">
        {SECTIONS.map((s) => (
          <section key={s.title}>
            <h2 className="text-lg font-semibold text-neutral-900">{s.title}</h2>
            <ul className="mt-3 space-y-2">
              {s.body.map((line) => (
                <li key={line} className="flex gap-2 text-[15px] leading-relaxed">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-300" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section>
          <h2 className="text-lg font-semibold text-neutral-900">8. Liên hệ</h2>
          <p className="mt-3 text-[15px] leading-relaxed">
            <strong>Tiệm bánh Cúc Quy</strong>
            <br />
            Điện thoại / Zalo:{' '}
            <a className="underline underline-offset-2" href="tel:0776750418">
              0776 750 418
            </a>
            <br />
            Facebook:{' '}
            <a
              className="underline underline-offset-2"
              href="https://www.facebook.com/104106988715686"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tiệm bánh Cúc Quy
            </a>
            <br />
            Instagram:{' '}
            <a
              className="underline underline-offset-2"
              href="https://www.instagram.com/tiembanhcucquy"
              target="_blank"
              rel="noopener noreferrer"
            >
              @tiembanhcucquy
            </a>
          </p>
        </section>
      </div>

      <p className="mt-12 border-t border-neutral-200 pt-6 text-sm text-neutral-500">
        Cập nhật lần cuối: {UPDATED_AT}
      </p>
      <p className="mt-4 text-sm">
        <a className="underline underline-offset-2" href="/">
          ← Về trang chủ
        </a>
      </p>
    </main>
  );
}
