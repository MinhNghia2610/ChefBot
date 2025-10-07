import React from 'react';

const GioiThieuPage = () => {
  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-5xl font-extrabold text-center text-red-600 mb-4">
          Hương Vị Việt Trên Bàn Ăn Hiện Đại
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Tại L2 Food, chúng tôi tin rằng ẩm thực là cầu nối giữa quá khứ và hiện tại.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Cột 1: Tầm nhìn & Sứ mệnh */}
          <div className="p-8 bg-white rounded-xl shadow-2xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b pb-2">
              Tầm Nhìn & Sứ Mệnh
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              **Tầm nhìn:** Trở thành chuỗi nhà hàng Việt Nam được yêu thích nhất, nổi tiếng với sự sáng tạo dựa trên nền tảng truyền thống.
            </p>
            <p className="text-gray-700 leading-relaxed">
              **Sứ mệnh:** Cung cấp những trải nghiệm ẩm thực đáng nhớ, cam kết về chất lượng nguyên liệu và dịch vụ tận tâm. Chúng tôi phục vụ không chỉ món ăn, mà còn là văn hóa.
            </p>
            
            <div className="mt-6 border-t pt-4">
                <p className="text-lg font-semibold text-red-600">Đầu bếp trưởng: Nguyễn Văn Khánh</p>
            </div>
          </div>

          {/* Cột 2: Hình ảnh nhà hàng */}
          <div>
            <img 
              src="https://placehold.co/600x450/DC2626/FFFFFF?text=L2+Food+Kitchen" 
              alt="Không gian nhà hàng L2 Food" 
              className="w-full rounded-2xl shadow-xl hover:scale-[1.01] transition duration-500"
            />
          </div>
        </div>

        {/* Nguyên tắc cốt lõi */}
        <div className="mt-16 text-center">
            <h3 className="text-3xl font-extrabold text-gray-800 mb-8">Nguyên Tắc Cốt Lõi</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white rounded-xl shadow-md transition duration-300 hover:shadow-red-200">
                    <p className="text-2xl font-bold text-red-500">100%</p>
                    <p className="font-semibold text-gray-700">Tươi Sạch</p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-md transition duration-300 hover:shadow-red-200">
                    <p className="text-2xl font-bold text-red-500">Sáng Tạo</p>
                    <p className="font-semibold text-gray-700">Hương Vị</p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-md transition duration-300 hover:shadow-red-200">
                    <p className="text-2xl font-bold text-red-500">Tận Tâm</p>
                    <p className="font-semibold text-gray-700">Phục Vụ</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default GioiThieuPage;