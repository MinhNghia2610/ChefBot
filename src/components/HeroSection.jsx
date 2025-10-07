import React from 'react';
import MenuStrip from './MenuStrip'; // Import MenuStrip đã được thêm

const HeroSection = () => {
  return (
    // Bỏ pt-16, Thêm relative
    <div className="relative h-screen"> 
      <div 
        className="h-full bg-cover bg-center flex flex-col items-center justify-center text-white"
        style={{ 
          // Thay thế bằng một URL placeholder tạm thời cho tới khi bạn có ảnh
          backgroundImage: `url('\img01.webp')`, 
        }}
      >
        {/* Lớp phủ và Nội dung giữ nguyên */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative text-center z-10">
          <p className="text-2xl italic font-serif">Welcome</p>
          <h1 className="text-6xl font-extrabold mt-2 mb-8 tracking-wide">
            TRẢI NGHIỆM TUYỆT VỜI
          </h1>
          {/* Nút ĐẶT HÀNG NGAY - CTA */}
          <button
            onClick={() => { /* logic chuyển đến trang đặt hàng */ }}
            className="mt-6 px-10 py-3 bg-red-600 hover:bg-red-700 text-white text-lg font-bold rounded-full shadow-lg transform transition duration-300 hover:scale-105"
          >
             ĐẶT MÓN ONLINE
          </button>
        </div>
        
        {/* Dải ảnh món ăn sẽ được đặt ngay tại đây */}
        <MenuStrip /> 
      </div>
    </div>
  );
};

export default HeroSection;