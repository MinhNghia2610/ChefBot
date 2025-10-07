import React from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';

// Dữ liệu mẫu (sử dụng lại và mở rộng)
const menuData = [
    { 
        category: 'Món Chính (Phở & Bún)', 
        items: [
            { id: 'M01', name: 'Phở Bò Đặc Biệt', price: 95000, desc: 'Thịt bò tái, nạm, gầu, gân. Nước dùng ninh 8 tiếng.', image: 'https://placehold.co/400x200/F8D7DA/DC3545?text=PHO' },
            { id: 'M02', name: 'Bún Chả Hà Nội', price: 85000, desc: 'Thịt nướng than hoa, chả băm, ăn kèm nước chấm chua ngọt.', image: 'https://placehold.co/400x200/D4EDDA/28A745?text=BUN+CHA' },
            { id: 'M03', name: 'Mì Quảng Hải Sản', price: 110000, desc: 'Tôm, mực tươi, trứng cút. Sợi mì vàng ươm, đậm đà.', image: 'https://placehold.co/400x200/FFF3CD/FFC107?text=MI+QUANG' },
        ]
    },
    { 
        category: 'Món Nhẹ & Ăn Kèm', 
        items: [
            { id: 'A01', name: 'Nem Rán Giòn', price: 60000, desc: 'Nem tôm thịt, cuốn bánh đa, chiên giòn rụm.', image: 'https://placehold.co/400x200/CCE5FF/007BFF?text=NEM' },
            { id: 'A02', name: 'Gỏi Cuốn Tôm Thịt', price: 75000, desc: 'Thanh mát, ăn kèm nước tương đậu phộng.', image: 'https://placehold.co/400x200/E2E3E5/6C757D?text=GOI+CUON' },
        ]
    },
    { 
        category: 'Thức Uống', 
        items: [
            { id: 'D01', name: 'Cà Phê Sữa Đá', price: 40000, desc: 'Cà phê nguyên chất, vị đậm đà.', image: 'https://placehold.co/400x200/D1ECF1/17A2B8?text=COFFEE' },
            { id: 'D02', name: 'Trà Sen Vàng', price: 35000, desc: 'Trà sen ướp lạnh, vị thanh tao.', image: 'https://placehold.co/400x200/F8F8F8/000000?text=TEA' },
        ]
    }
];

const formatCurrency = (amount) => amount.toLocaleString('vi-VN');

const MenuPage = () => {
    // Tạm thời chưa xử lý logic Cart ở đây, chỉ hiển thị UI
    const handleAddToCart = (item) => {
        console.log(`Đã thêm ${item.name} vào giỏ hàng`);
        // Logic thực tế sẽ gọi addItemToCart() từ useCart()
    };

    return (
        <div className="pt-24 pb-16 bg-white min-h-screen">
            <div className="container mx-auto px-4 md:px-8">
                <h1 className="text-6xl font-extrabold text-center text-gray-900 mb-2">
                    Thực Đơn Đầy Đủ
                </h1>
                <p className="text-center text-gray-500 mb-12">
                    Khám phá sự đa dạng của ẩm thực Việt Nam qua bàn tay L2 Food.
                </p>

                {menuData.map((category, catIndex) => (
                    <div key={catIndex} className="mb-12">
                        <h2 className="text-4xl font-bold text-red-600 border-b-2 border-red-200 pb-2 mb-8 mt-6">
                            {category.category}
                        </h2>
                        
                        {/* Hiển thị món ăn dạng danh sách */}
                        <div className="space-y-6">
                            {category.items.map((item) => (
                                <div key={item.id} className="flex flex-col md:flex-row items-center bg-gray-50 p-4 rounded-xl shadow-lg hover:shadow-red-100 transition duration-300">
                                    
                                    {/* Ảnh món ăn */}
                                    <img 
                                        src={item.image} 
                                        alt={item.name} 
                                        className="w-full md:w-40 h-32 object-cover rounded-lg flex-shrink-0 mb-4 md:mb-0 md:mr-6"
                                    />
                                    
                                    {/* Chi tiết món ăn */}
                                    <div className="flex-grow">
                                        <h3 className="text-2xl font-bold text-gray-900">{item.name}</h3>
                                        <p className="text-gray-600 mt-1 mb-2">{item.desc}</p>
                                        <p className="text-xl font-extrabold text-red-700">
                                            {formatCurrency(item.price)} <span className="text-sm font-semibold">VNĐ</span>
                                        </p>
                                    </div>

                                    {/* Nút Thêm vào Giỏ */}
                                    <button
                                        onClick={() => handleAddToCart(item)}
                                        className="mt-4 md:mt-0 px-6 py-2 bg-red-600 text-white font-semibold rounded-full shadow-md hover:bg-red-700 transition duration-300 flex items-center"
                                    >
                                        <ShoppingCartIcon className="w-5 h-5 mr-2" />
                                        Thêm
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MenuPage;