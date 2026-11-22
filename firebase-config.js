/**
 * CẤU HÌNH ĐỒNG BỘ ĐÁM MÂY (FIREBASE FIRESTORE)
 * 
 * Cách 1: Bạn có thể điền thông tin dự án Firebase của bạn trực tiếp vào biến dưới đây.
 * Cách 2: Bạn có thể để trống file này và bấm nút "⚙️ Đám mây" trực tiếp trên giao diện web để dán cấu hình.
 * 
 * Khi có cấu hình, hệ thống sẽ tự động đồng bộ thời gian thực đa người dùng (Real-time).
 * Khi không có cấu hình, hệ thống sẽ chạy ở chế độ Offline (Lưu trữ an toàn trên máy qua localStorage).
 */

window.__firebase_config = window.__firebase_config || null;

/* Ví dụ mẫu cấu hình:
window.__firebase_config = {
  apiKey: "AIzaSy...",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app",
  storageBucket: "your-app.firebasestorage.app",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef..."
};
*/
