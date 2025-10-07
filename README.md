# 🍽️ HỆ THỐNG QUẢN LÝ NHÀ HÀNG (Restaurant POS System)

Dự án được xây dựng nhằm cung cấp giải pháp quản lý toàn diện cho hoạt động kinh doanh nhà hàng, từ đặt bàn, gọi món đến quản lý kho và báo cáo doanh thu.

## 🚀 Tính Năng Chính
* **Quản Lý Đơn Hàng (POS):** Giao diện trực quan cho nhân viên phục vụ tạo và theo dõi đơn hàng.
* **Quản Lý Bàn:** Sơ đồ bàn theo khu vực, cập nhật trạng thái (Trống/Có khách/Đã đặt).
* **Quản Lý Menu:** Thêm/sửa/xóa món ăn, phân loại danh mục, cập nhật giá.
* **Quản Lý Kho (Tối giản):** Theo dõi nguyên vật liệu cơ bản.
* **Báo Cáo:** Thống kê doanh thu theo thời gian.

---

## 🛠️ Công Nghệ Sử Dụng

| Công Nghệ | Mô tả |
| :--- | :--- |
| **Frontend** | ReactJS (v18+) (Sử dụng **Vite**) |
| **Styling** | Tailwind CSS (Utility-First Framework) |
| **Routing** | React Router DOM |

---

## 📝 Hướng Dẫn Cài Đặt

### 1. Yêu cầu Tiên quyết
Bạn cần cài đặt:
* [Node.js](https://nodejs.org/) (Khuyên dùng phiên bản v18 trở lên)
* `npm` (đi kèm với Node.js) hoặc `yarn`

### 2. Thiết Lập Môi trường

1.  **Clone Repository:**
    ```bash
    git clone [Đường dẫn GitHub của bạn]
    cd ten-du-an
    ```

2.  **Cài đặt Phụ thuộc:**
    Dự án sử dụng các gói được liệt kê trong `package.json`.
    ```bash
    npm install
    # HOẶC
    yarn install
    ```

3.  **Cấu hình Biến Môi trường:**
    Tạo một file `.env` ở thư mục gốc và điền các thông tin cần thiết (ví dụ: API Key, URL Backend, v.v.):
    ```
    # Ví dụ
    VITE_APP_API_URL=http://localhost:5000/api/
    ```
    *(Lưu ý: Đối với Vite, biến môi trường phải bắt đầu bằng `VITE_`)*

4.  **Chạy Dự án:**
    ```bash
    npm run dev
    # HOẶC
    yarn dev
    ```
    Ứng dụng sẽ mở tự động tại **`http://localhost:5173`**.

---

## 🧑‍🤝‍🧑 Đóng Góp

1.  **Tạo nhánh:** `git checkout -b feature/ten-tinh-nang`
2.  **Commit:** `git commit -m "feat: Thêm tính năng [mô tả ngắn gọn]"`
3.  **Push:** `git push origin feature/ten-tinh-nang`
4.  **Tạo Pull Request (PR)**: Yêu cầu hợp nhất vào nhánh `main` và chờ kiểm duyệt.
git remote add origin(https://github.com/MinhNghia2610/ChefBot)