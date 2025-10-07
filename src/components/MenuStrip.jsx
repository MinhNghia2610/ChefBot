import React from 'react';

// Dữ liệu mẫu cho các món ăn (sử dụng ảnh placeholder)
const menuItems = [
    { id: 1, name: 'Burger', price: 85000, image: '/img02.jpg' },
    { id: 2, name: 'Pizza', price: 150000, image: '/img03.jpg' },
    { id: 3, name: 'Salad', price: 65000, image: '/img04.jpg' },
    { id: 4, name: 'Steak', price: 220000, image: '/img05.jpg' },
    { id: 5, name: 'Pasta', price: 95000, image: '/img06.png' },
    { id: 6, name: 'Sushi', price: 180000, image: '/img07.png' },
];

const MenuStrip = () => {
  return (
    // Đặt dải ảnh ở cuối Hero Section, sử dụng absolute để nổi lên trên nền
    <div className="absolute -bottom-16 w-full z-20 px-4 md:px-8">
      <style>{`
        /* Ẩn thanh cuộn cho MenuStrip */
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
        }
      `}</style>
      <div 
        className="flex space-x-6 overflow-x-auto p-4 md:p-6 bg-white shadow-xl rounded-xl scrollbar-hide"
      >
        {menuItems.map((item) => (
          <div 
            key={item.id} 
            className="flex-shrink-0 w-48 bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer"
          >
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-32 object-cover"
              onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/200x200/94A3B8/FFFFFF?text=Lỗi" }}
            />
            <div className="p-3 text-center">
              <h3 className="text-sm font-bold text-gray-800 truncate">{item.name}</h3>
              <p className="text-xs font-semibold text-red-500 mt-1">{item.price.toLocaleString('vi-VN')} VNĐ</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuStrip;