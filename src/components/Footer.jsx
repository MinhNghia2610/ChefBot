import React from 'react';
// Đã sửa: Thêm đuôi /thêm từ khóa 'icons' hoặc điều chỉnh theo cấu trúc lucide-react mới nhất
// Sử dụng cú pháp import chung:
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react'; 

const Footer = () => {
    // Lưu ý: Tôi đã đổi icon FacebookSquare thành Facebook cho phù hợp với gói Lucide thông dụng hơn.
    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-gray-700 pb-10">
                    
                    {/* Cột 1: Logo và Thông tin liên hệ */}
                    <div className="space-y-4">
                        <h3 className="text-3xl font-bold text-red-500 tracking-wider">L2 Food</h3>
                        <p className="text-gray-400">
                            Hương vị Việt Nam đích thực, được chế biến bằng cả trái tim.
                        </p>
                        <div className="space-y-2 text-sm">
                            <p><strong>Địa chỉ:</strong> 123 Đường Phở, Quận Bánh Mì, TP. HCM</p>
                            <p><strong>Điện thoại:</strong> (028) 123 4567</p>
                            <p><strong>Email:</strong> support@l2food.vn</p>
                        </div>
                    </div>

                    {/* Cột 2: Liên kết Nhanh */}
                    <div>
                        <h4 className="text-xl font-semibold mb-6 text-white border-b-2 border-red-500 inline-block pb-1">
                            Liên Kết
                        </h4>
                        <ul className="space-y-3">
                            <li><a href="#trang-chu" className="text-gray-400 hover:text-red-400 transition duration-200">Trang Chủ</a></li>
                            <li><a href="#gioi-thieu" className="text-gray-400 hover:text-red-400 transition duration-200">Về Chúng Tôi</a></li>
                            <li><a href="#thuc-don" className="text-gray-400 hover:text-red-400 transition duration-200">Thực Đơn</a></li>
                            <li><a href="#bai-viet" className="text-gray-400 hover:text-red-400 transition duration-200">Tin Tức & Blog</a></li>
                        </ul>
                    </div>

                    {/* Cột 3: Chính sách & Hỗ trợ */}
                    <div>
                        <h4 className="text-xl font-semibold mb-6 text-white border-b-2 border-red-500 inline-block pb-1">
                            Chính Sách
                        </h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-400 hover:text-red-400 transition duration-200">Chính sách bảo mật</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-red-400 transition duration-200">Điều khoản dịch vụ</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-red-400 transition duration-200">Phương thức thanh toán</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-red-400 transition duration-200">FAQ</a></li>
                        </ul>
                    </div>
                    
                    {/* Cột 4: Mạng xã hội & Newsletter */}
                    <div>
                        <h4 className="text-xl font-semibold mb-6 text-white border-b-2 border-red-500 inline-block pb-1">
                            Nhận Tin Mới
                        </h4>
                        {/* Form đăng ký Newsletter */}
                        <p className="text-sm text-gray-400 mb-4">
                            Đừng bỏ lỡ các ưu đãi và công thức nấu ăn mới nhất!
                        </p>
                        <form className="flex flex-col space-y-3">
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    placeholder="Nhập email của bạn"
                                    className="w-full p-3 pl-10 text-sm rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-red-500 focus:border-red-500"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 bg-red-600 font-semibold rounded-lg hover:bg-red-700 transition duration-300"
                            >
                                Đăng Ký
                            </button>
                        </form>

                        {/* Mạng xã hội */}
                        <div className="flex space-x-4 mt-6">
                            <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-red-500 transition duration-200">
                                <Facebook className="w-7 h-7" />
                            </a>
                            <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-red-500 transition duration-200">
                                <Instagram className="w-7 h-7" />
                            </a>
                            <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-red-500 transition duration-200">
                                <Twitter className="w-7 h-7" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bản quyền */}
                <div className="text-center pt-8 text-gray-500 text-sm">
                    © {new Date().getFullYear()} L2 Food. Thiết kế và hương vị được bảo hộ.
                </div>
            </div>
        </footer>
    );
};
export default Footer; // ĐÃ THÊM DÒNG NÀY để trở thành Default Export