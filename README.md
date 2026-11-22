# Hệ thống Theo dõi Hồ sơ - Chứng từ Trình ký

Ứng dụng web chuyên biệt để **số hóa sổ theo dõi chứng từ trình ký** (Hợp đồng, Phụ lục hợp đồng, Cam kết, Đề nghị thanh toán...), thay thế hoàn toàn sổ Excel thủ công rời rạc.

---

## 1. Cấu trúc dự án

```
d:\CODE\hosobehong\xulyhoso\
├── api/
│   └── config.js        # Serverless API đọc Environment Variables từ Vercel
├── index.html           # Toàn bộ giao diện & logic ứng dụng Single-Page
├── vercel.json          # Cấu hình tối ưu triển khai trên Vercel
├── package.json         # Khai báo dự án Node/Vercel
├── firebase-config.js   # Tùy chọn nạp cấu hình Firebase bằng code (khi chạy local)
└── README.md            # Tài liệu hướng dẫn sử dụng & cấu hình Environment
```

---

## 2. Hướng dẫn cấu hình Environment Variables trên Vercel

Khi bạn deploy dự án lên Vercel, serverless function tại `/api/config.js` sẽ tự động đọc biến môi trường để cấp cho ứng dụng kết nối Firebase Firestore đồng bộ thời gian thực.

### Cách 1: Đặt 1 biến duy nhất `FIREBASE_CONFIG` (Nhanh & Tiện nhất)
1. Đăng nhập vào trang quản lý [Vercel Dashboard](https://vercel.com/dashboard).
2. Chọn dự án của bạn -> Chọn tab **Settings** -> Chọn mục **Environment Variables** ở menu bên trái.
3. Điền:
   - **Key:** `FIREBASE_CONFIG`
   - **Value:** Dán toàn bộ chuỗi JSON cấu hình Firebase của bạn:
     ```json
     {
       "apiKey": "AIzaSy...",
       "authDomain": "ten-du-an.firebaseapp.com",
       "projectId": "ten-du-an",
       "storageBucket": "ten-du-an.firebasestorage.app",
       "messagingSenderId": "1234567890",
       "appId": "1:1234567890:web:abcdef..."
     }
     ```
   - Chọn môi trường: tích chọn cả **Production**, **Preview**, **Development**.
4. Bấm **Save**.
5. Vào tab **Deployments** -> Bấm vào dấu ba chấm `...` ở bản deploy mới nhất -> Chọn **Redeploy** (để Vercel nạp biến môi trường mới).

---

### Cách 2: Đặt các biến riêng lẻ (Tùy chọn)
Nếu bạn thích cấu hình từng biến riêng, bạn có thể tạo 6 biến sau trong **Environment Variables** trên Vercel:

| Tên biến (Key) | Ý nghĩa |
|---|---|
| `FIREBASE_API_KEY` | API Key từ Firebase (`AIzaSy...`) |
| `FIREBASE_AUTH_DOMAIN` | Domain xác thực (`your-app.firebaseapp.com`) |
| `FIREBASE_PROJECT_ID` | Mã dự án (`your-app-id`) |
| `FIREBASE_STORAGE_BUCKET` | Storage bucket (`your-app.firebasestorage.app`) |
| `FIREBASE_MESSAGING_SENDER_ID` | ID gửi tin (`123456789`) |
| `FIREBASE_APP_ID` | Web App ID (`1:123456789:web:abcdef...`) |

---

## 3. Cách lấy cấu hình Firebase miễn phí (trong 1 phút)

1. Truy cập [console.firebase.google.com](https://console.firebase.google.com/) và tạo một Project miễn phí.
2. Vào **Build** -> **Firestore Database** -> Bấm **Create database** -> Chọn chế độ **Start in test mode**.
3. Bấm vào biểu tượng **⚙️ Cài đặt dự án** (Project settings ở góc trái trên cùng).
4. Cuộn xuống phần **Your apps** -> Chọn biểu tượng Web (`</>`) -> Đặt tên ứng dụng và bấm **Register app**.
5. Copy các giá trị trong đoạn `const firebaseConfig = { ... }` để dán vào Vercel như hướng dẫn ở Mục 2.

---

## 4. Cơ chế hoạt động & Trạng thái kết nối

- **Khi đã cấu hình Environment Variables trên Vercel:**
  Hệ thống hiển thị nhãn xanh: **`🟢 Đồng bộ trực tuyến (Vercel Environment)`**. Mọi nhân sự truy cập link web đều thấy dữ liệu được cập nhật theo thời gian thực (Real-time).
- **Khi chạy trên máy (Local) hoặc chưa cấu hình Vercel:**
  Hệ thống tự động hiển thị: **`⚪ Chế độ Offline (Bộ nhớ máy)`**. Toàn bộ dữ liệu được lưu an toàn trong `localStorage` của trình duyệt, không lo mất dữ liệu.

---

## 5. Các tính năng chính của hệ thống

1. **Bảo mật phân quyền theo mã hồ sơ (Passcode):**
   - Mỗi hồ sơ khi thêm mới đều được cấp một mã bảo vệ (4 số ngẫu nhiên hoặc tự đặt).
   - Khi bấm **Sửa (✎)** hoặc **Xóa (🗑)**, hệ thống yêu cầu nhập đúng mã mới cho phép thao tác.
2. **Quản lý & Thêm nơi nhận linh hoạt:**
   - Bấm **+ Nơi nhận** trên thanh tiêu đề để thêm phòng ban / người duyệt mới.
   - Hoặc gõ trực tiếp tên nơi nhận mới khi đang tạo / chỉnh sửa hồ sơ.
3. **Sổ theo dõi chuẩn 10 cột:**
   - STT, MHS, Tên hồ sơ, Nhà cung cấp, Nơi/Người nhận, Ngày gửi, Người gửi, Ngày trả lại, Ngày hạn, Trạng thái, Thao tác.
   - Hỗ trợ đổi nơi nhận 1 chạm, nút **✓ Trả HS**, tìm kiếm tiếng Việt không dấu siêu tốc và 4 thẻ KPI lọc nhanh.
4. **Nhập & Xuất Excel (.xlsx) chuẩn:**
   - Tải file mẫu 9 cột chuẩn.
   - Nhập dữ liệu hàng loạt từ Excel (Gộp thêm / Thay thế).
   - Xuất báo cáo 2 sheet: *Theo_doi_ho_so* và *Lich_su_luan_chuyen*.
