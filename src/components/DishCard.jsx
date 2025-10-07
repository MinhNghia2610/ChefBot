// src/components/DishCard.jsx

import React from 'react';

const DishCard = ({ dish }) => {
  return (
    // Card cha: Độ rộng cố định, căn giữa nội dung
    <div className="flex flex-col items-center w-40 text-center mx-4">
      
      {/* Ảnh món ăn (Ảnh tròn) */}
      <div className="w-28 h-28 mb-3">
        <img 
          src={dish.image} 
          alt={dish.name} 
          // Các lớp Tailwind quan trọng: 
          // rounded-full (tạo hình tròn), object-cover (giữ tỷ lệ ảnh)
          className="w-full h-full rounded-full object-cover border-4 border-white shadow-xl hover:scale-105 transition duration-300"
        />
      </div>

      {/* Tên món ăn */}
      <h3 className="text-gray-200 text-sm font-semibold mb-1">
        {dish.name}
      </h3>
      
      {/* Mô tả ngắn */}
      <p className="text-gray-400 text-xs italic">
        {dish.description}
      </p>
    </div>
  );
};

export default DishCard;