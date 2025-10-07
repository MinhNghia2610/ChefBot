import React, { useState, useEffect } from 'react';
// Imports các components chính
import Navbar from './components/Navbar'; 
import HeroSection from './components/HeroSection'; 
import CartSidebar from './components/CartSidebar';
import StorySection from './components/StorySection'; 
import Testimonials from './components/Testimonials'; 
import Footer from './components/Footer';
import AuthModal from './components/AuthModal'; // IMPORT MỚI: Auth Modal

// Imports các trang nội dung (điều chỉnh tên file theo cấu trúc mới)
import GioiThieuPage from './pages/AboutUs'; 
import MenuPage from './pages/MenuPage';
import BaiVietPage from './pages/BlogPage'; 
import ReservationPage from './pages/ReservationPage'; 

// Hàm đơn giản để xác định trang hiện tại dựa trên hash URL (ví dụ: #gioi-thieu)
const getPage = () => {
    const hash = window.location.hash.slice(1).toLowerCase();
    switch (hash) {
        case 'gioi-thieu':
            return 'gioi-thieu';
        case 'thuc-don':
            return 'thuc-don';
        case 'bai-viet':
            return 'bai-viet';
        case 'dat-ban':
            return 'dat-ban';
        default:
            return 'trang-chu';
    }
};

function App() {
    const [currentPage, setCurrentPage] = useState(getPage());
    const [isCartOpen, setIsCartOpen] = useState(false); 
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false); // STATE MỚI: Quản lý Auth Modal

    // Lắng nghe sự kiện thay đổi hash URL để chuyển trang
    useEffect(() => {
        const handleHashChange = () => {
            setCurrentPage(getPage());
        };
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    // Hàm render nội dung trang dựa trên currentPage
    const renderPage = () => {
        // Tạm thời bao gồm MenuPage trong trang chủ để có thể hiển thị sản phẩm và chức năng thêm giỏ hàng
        if (currentPage === 'trang-chu') {
            return (
                <>
                    <HeroSection /> 
                    {/* BỔ SUNG: Thêm MenuPage vào trang chủ để người dùng có thể tương tác với giỏ hàng ngay */}
                    <MenuPage /> 
                    <StorySection />
                    <Testimonials />
                </>
            );
        }

        switch (currentPage) {
            case 'gioi-thieu':
                return <GioiThieuPage />; 
            case 'thuc-don':
                return <MenuPage />;
            case 'bai-viet':
                return <BaiVietPage />;
            case 'dat-ban': // ĐIỀU KIỆN MỚI: Hiển thị trang đặt bàn
                return <ReservationPage />; 
            default:
                // Nếu không phải trang chủ và hash không khớp, mặc định về Trang Chủ
                return (
                    <>
                        <HeroSection /> 
                        <StorySection />
                        <Testimonials />
                    </>
                );
        }
    };

    // Render Navbar, truyền state Giỏ Hàng và trạng thái Auth Modal
    const renderNavbar = () => (
        <Navbar 
            setIsCartOpen={setIsCartOpen} 
            setIsAuthModalOpen={setIsAuthModalOpen} // PROP MỚI: Truyền hàm điều khiển Auth Modal
            currentPage={currentPage}
        />
    );

    return (
        <div className="App font-sans">
            {renderNavbar()}

            <main className="min-h-screen">
                {/* Render nội dung trang hiện tại */}
                {renderPage()} 
            </main>
            
            {/* CartSidebar được đặt ngoài main và nhận state điều khiển */}
            <CartSidebar isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />

            {/* MODAL XÁC THỰC MỚI */}
            <AuthModal 
                isOpen={isAuthModalOpen} 
                onClose={() => setIsAuthModalOpen(false)} 
            />

            {/* Footer */}
            <Footer /> 

        </div>
    );
}

export default App;