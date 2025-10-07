import React, { useState } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext'; 
import CartSidebar from './CartSidebar';
import { Menu, X } from 'lucide-react'; // Sử dụng Lucide Icons cho Mobile Menu

// THAY ĐỔI: Navbar bây giờ nhận setIsAuthModalOpen
const Navbar = ({ setIsCartOpen, setIsAuthModalOpen }) => { 
    // Thay đổi: Đặt tên mục "Đặt bàn" để khớp với logic routing
    const navItems = [
        { name: 'Trang chủ', hash: '#trang-chu' }, 
        { name: 'Giới thiệu', hash: '#gioi-thieu' }, 
        { name: 'Thực đơn', hash: '#thuc-don' }, 
        { name: 'Bài viết', hash: '#bai-viet' }
    ];
    
    // Thêm mục Đặt Bàn dưới dạng button hoặc xử lý đặc biệt
    const reservationHash = '#dat-ban';

    const { totalItems } = useCart(); 
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State quản lý menu mobile

    // Hàm xử lý click Đặt Bàn (chuyển hướng)
    const handleReservationClick = () => {
        window.location.hash = reservationHash;
        setIsMobileMenuOpen(false); // Đóng menu nếu đang ở mobile
    };
    
    // Hàm xử lý mở Modal Auth
    const handleAuthClick = () => {
        if (setIsAuthModalOpen) {
            setIsAuthModalOpen(true);
        }
        setIsMobileMenuOpen(false); // Đảm bảo đóng mobile menu khi mở modal
    };

    // NOTE: Component CartSidebar KHÔNG NÊN được gọi ở đây. Nó nên được gọi trong App.jsx
    // Thay vì đó, Navbar nhận setIsCartOpen để mở Sidebar.

    return (
        <>
            {/* Thanh Header chính */}
            <header className="bg-black/80 fixed w-full top-0 z-50 shadow-lg backdrop-blur-sm"> 
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        
                        {/* Logo */}
                        <a href="#trang-chu" className="flex-shrink-0">
                            <span className="text-white text-2xl font-bold tracking-widest hover:text-red-500 transition duration-300">L2 Food</span>
                        </a>

                        {/* Nav Items (Desktop) */}
                        <nav className="hidden md:flex space-x-6 items-center">
                            {navItems.map((item) => (
                                <a 
                                    key={item.name} 
                                    href={item.hash}
                                    className="px-3 py-2 rounded-md text-sm font-medium transition duration-150 text-white hover:text-red-500 hover:bg-white/10"
                                >
                                    {item.name}
                                </a>
                            ))}
                            {/* Nút Đặt Bàn (Desktop) */}
                             <button
                                onClick={handleReservationClick}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition duration-150 shadow-lg transform hover:scale-[1.03]"
                            >
                                Đặt Bàn
                            </button>
                        </nav>

                        {/* Giỏ hàng, Auth, và Mobile Button */}
                        <div className="flex items-center space-x-3">
                            
                            {/* Biểu tượng Giỏ hàng */}
                            <button 
                                onClick={() => setIsCartOpen(true)}
                                className="relative text-white hover:text-red-500 transition duration-150 p-2 rounded-full hover:bg-white/10"
                                aria-label="Mở Giỏ hàng"
                            >
                                <ShoppingCartIcon className="h-6 w-6" />
                                
                                {totalItems > 0 && ( 
                                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white ring-2 ring-black/80">
                                        {totalItems}
                                    </span>
                                )}
                            </button>

                            {/* Nút Mobile Menu */}
                            <button
                                className="md:hidden p-2 text-white hover:text-red-500"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                aria-label="Toggle menu"
                            >
                                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>

                            {/* Auth Buttons (Desktop) */}
                            <button 
                                onClick={handleAuthClick} // THAY ĐỔI: Thêm onClick để mở Auth Modal
                                className="hidden sm:block text-white text-sm hover:text-gray-300"
                            >
                                Đăng nhập
                            </button>
                            <button 
                                onClick={handleAuthClick} // THAY ĐỔI: Thêm onClick để mở Auth Modal
                                className="hidden sm:block bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium transition duration-150"
                            >
                                Đăng ký
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu (Dropdown) */}
                <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-700/50 bg-black/90">
                        {navItems.map((item) => (
                            <a 
                                key={item.name}
                                href={item.hash} 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:bg-gray-700 hover:text-white transition duration-150"
                            >
                                {item.name}
                            </a>
                        ))}
                        {/* Nút Đặt Bàn (Mobile) */}
                        <button
                            onClick={handleReservationClick}
                            className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-red-600 hover:bg-red-700 transition duration-150 mt-1"
                        >
                            Đặt Bàn Ngay
                        </button>
                        <button 
                            onClick={handleAuthClick} // THAY ĐỔI: Thêm onClick để mở Auth Modal
                            className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:bg-gray-700 hover:text-white"
                        >Đăng nhập</button>
                        <button 
                            onClick={handleAuthClick} // THAY ĐỔI: Thêm onClick để mở Auth Modal
                            className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-white bg-red-500 hover:bg-red-600 text-center"
                        >Đăng ký</button>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Navbar;