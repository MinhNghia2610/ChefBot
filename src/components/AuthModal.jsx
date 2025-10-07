import React, { useState } from 'react';
import { X, User, Lock, Mail } from 'lucide-react';

// Giả định: Bạn truyền một prop 'isOpen' và 'onClose' từ component cha
const AuthModal = ({ isOpen, onClose }) => {
    // State để chuyển đổi giữa form "login" (đăng nhập) và "register" (đăng ký)
    const [isLoginView, setIsLoginView] = useState(true);
    // State để quản lý thông báo lỗi giả định
    const [feedbackMessage, setFeedbackMessage] = useState('');

    if (!isOpen) return null;

    // Hàm giả lập việc gửi form
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // --- Logic Tĩnh (Giả lập) ---
        setFeedbackMessage('');
        const formType = isLoginView ? 'Đăng nhập' : 'Đăng ký';
        
        // Chỉ hiển thị thông báo thành công và đóng modal sau 2 giây
        setFeedbackMessage(`${formType} thành công (Tĩnh)!`);

        setTimeout(() => {
            onClose();
            setFeedbackMessage('');
        }, 2000);
        // -----------------------------
    };

    // Form Đăng nhập
    const LoginForm = () => (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-gray-800">Đăng Nhập</h2>
            {feedbackMessage && (
                <div className="bg-green-100 text-green-700 p-3 rounded-lg text-sm font-medium">
                    {feedbackMessage}
                </div>
            )}
            <div>
                <label htmlFor="login-email" className="sr-only">Email</label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        id="login-email"
                        type="email"
                        required
                        placeholder="Email"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="login-password" className="sr-only">Mật khẩu</label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        id="login-password"
                        type="password"
                        required
                        placeholder="Mật khẩu"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150"
                    />
                </div>
            </div>
            <button
                type="submit"
                className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-150 transform hover:scale-[1.01]"
            >
                Đăng Nhập
            </button>
            <p className="text-center text-sm text-gray-600">
                Chưa có tài khoản?{' '}
                <button
                    type="button"
                    onClick={() => { setIsLoginView(false); setFeedbackMessage(''); }}
                    className="text-red-600 hover:text-red-700 font-medium transition duration-150"
                >
                    Đăng ký ngay
                </button>
            </p>
        </form>
    );

    // Form Đăng ký
    const RegisterForm = () => (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-gray-800">Đăng Ký</h2>
             {feedbackMessage && (
                <div className="bg-green-100 text-green-700 p-3 rounded-lg text-sm font-medium">
                    {feedbackMessage}
                </div>
            )}
            <div>
                <label htmlFor="register-name" className="sr-only">Tên người dùng</label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        id="register-name"
                        type="text"
                        required
                        placeholder="Tên người dùng"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="register-email" className="sr-only">Email</label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        id="register-email"
                        type="email"
                        required
                        placeholder="Email"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="register-password" className="sr-only">Mật khẩu</label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        id="register-password"
                        type="password"
                        required
                        placeholder="Mật khẩu (tối thiểu 6 ký tự)"
                        minLength="6"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150"
                    />
                </div>
            </div>
            <button
                type="submit"
                className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-150 transform hover:scale-[1.01]"
            >
                Đăng Ký
            </button>
            <p className="text-center text-sm text-gray-600">
                Đã có tài khoản?{' '}
                <button
                    type="button"
                    onClick={() => { setIsLoginView(true); setFeedbackMessage(''); }}
                    className="text-red-600 hover:text-red-700 font-medium transition duration-150"
                >
                    Đăng nhập
                </button>
            </p>
        </form>
    );

    return (
        // Overlay (Nền đen mờ)
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
            onClick={onClose} // Đóng modal khi click ra ngoài
        >
            {/* Modal Content */}
            <div 
                className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 relative transform transition-all duration-300"
                onClick={(e) => e.stopPropagation()} // Ngăn chặn click lan truyền
            >
                {/* Nút Đóng */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition duration-150 p-1 rounded-full hover:bg-gray-100"
                    aria-label="Đóng"
                >
                    <X className="h-6 w-6" />
                </button>

                {/* Hiển thị form tương ứng */}
                {isLoginView ? <LoginForm /> : <RegisterForm />}
            </div>
        </div>
    );
};

export default AuthModal;