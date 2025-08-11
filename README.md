# ASM App - Chức năng Đăng nhập với Role

## Mô tả
Ứng dụng React Native với chức năng đăng nhập sử dụng Redux và Axios, hỗ trợ 2 role: **User** và **Admin**.

## Tính năng chính

### 🔐 Hệ thống Authentication
- Đăng nhập với email và password
- Phân quyền theo role (User/Admin)
- Lưu trữ trạng thái đăng nhập với Redux
- Tự động điều hướng theo role sau khi đăng nhập

### 👤 Role User
- Truy cập màn hình Home (Tab navigation)
- Xem danh sách sản phẩm
- Tìm kiếm sản phẩm
- Xem danh mục sản phẩm
- Chức năng đăng xuất

### 👨‍💼 Role Admin
- Truy cập màn hình Admin Dashboard
- Xem thông tin tài khoản
- Quản lý hệ thống (menu placeholder)
- Chức năng đăng xuất

## Cấu trúc dự án

```
ASM/
├── Redux/
│   ├── actions/
│   │   └── authAction.js          # Actions cho authentication
│   ├── reducer/
│   │   └── authReducer.js         # Reducer quản lý auth state
│   └── store/
│       └── store.js               # Redux store
├── Components/
│   └── AuthGuard.js               # Component bảo vệ route
├── Screen/
│   ├── LoginScreen.js             # Màn hình đăng nhập
│   ├── AdminScreen.js             # Dashboard admin
│   └── HomeScreen.js              # Màn hình chính cho user
└── db.json                        # Database JSON với users
```

## Cài đặt và chạy

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Khởi động JSON Server
```bash
npm run server
```

### 3. Khởi động ứng dụng
```bash
npm start
```

## Tài khoản mẫu

### User Account
- **Email:** user@example.com
- **Password:** 123456
- **Role:** user

### Admin Account
- **Email:** admin@example.com
- **Password:** 123456
- **Role:** admin

## Luồng hoạt động

1. **Khởi động app** → Splash Screen
2. **Kiểm tra auth status** → Nếu đã đăng nhập → Điều hướng theo role
3. **Nếu chưa đăng nhập** → Login Screen
4. **Sau khi đăng nhập thành công:**
   - Role = "user" → Navigate to Tab (Home)
   - Role = "admin" → Navigate to AdminScreen
5. **Đăng xuất** → Quay về Login Screen

## Công nghệ sử dụng

- **React Native** - Framework mobile
- **Redux Toolkit** - State management
- **Axios** - HTTP client
- **React Navigation** - Navigation
- **JSON Server** - Mock API

## API Endpoints

- **Login:** `GET /user?email={email}&password={password}`
- **Base URL:** `http://192.168.1.99:3001`

## Tính năng bảo mật

- Validation input trước khi gửi request
- Xử lý lỗi từ server
- Loading state khi thực hiện request
- Protected routes với AuthGuard
- Tự động điều hướng theo quyền

## Mở rộng

Để thêm role mới:
1. Thêm user với role mới vào `db.json`
2. Cập nhật logic điều hướng trong `AppNavigator`
3. Tạo màn hình tương ứng cho role mới
4. Cập nhật `AuthGuard` nếu cần

## Lưu ý

- Đảm bảo JSON Server đang chạy trước khi test
- Kiểm tra IP address trong `authAction.js` phù hợp với môi trường
- Có thể thêm AsyncStorage để lưu trữ token lâu dài
