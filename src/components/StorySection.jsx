import React from 'react';
// Icon dùng để trang trí
import { HeartIcon, SunIcon, UsersIcon } from '@heroicons/react/24/outline';

const StorySection = () => {
  return (
    // Phần nền nhẹ nhàng để phân tách với các section khác
    <section className="py-20 md:py-32 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Tiêu đề chính */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <p className="text-red-600 font-semibold uppercase tracking-wider mb-2">
            Câu Chuyện Của Chúng Tôi
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Nơi Đam Mê Ẩm Thực Việt Thăng Hoa
          </h2>
        </div>

        {/* Nội dung kể chuyện theo bố cục 2 cột */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Cột 1: Hình ảnh và mô tả ngắn */}
          <div className="relative">
            {/* Hình ảnh chính (Sử dụng placeholder URL) */}
            <img 
              src="https://placehold.co/800x600/FEE2E2/DC2626?text=L2+Food+Kitchen" 
              alt="Bếp ăn L2 Food" 
              className="rounded-xl shadow-2xl w-full h-auto"
            />
            {/* Thẻ nhỏ nổi bật */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white p-6 rounded-lg shadow-xl border-t-4 border-red-500 hidden md:block">
                <p className="text-lg font-bold text-gray-900">
                    Hơn 10 Năm Phục Vụ
                </p>
                <p className="text-sm text-gray-600">
                    Đảm bảo chất lượng và hương vị truyền thống.
                </p>
            </div>
          </div>
          
          {/* Cột 2: Chi tiết câu chuyện và giá trị cốt lõi */}
          <div className="mt-8 lg:mt-0">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Khởi nguồn từ tình yêu với Phở và Bánh Mì
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              L2 Food được thành lập vào năm 2015 bởi hai anh em có chung niềm đam mê sâu sắc với ẩm thực đường phố Việt Nam. Chúng tôi tin rằng những món ăn đơn giản nhất như Phở, Bánh Mì, hay Gỏi Cuốn đều chứa đựng tinh hoa văn hóa và cần được gìn giữ, phát triển.
            </p>
            
            <p className="text-gray-700 leading-relaxed mb-8">
              Mỗi nguyên liệu tại L2 Food đều được chọn lọc kỹ lưỡng, tươi mới từ các nông trại địa phương, đảm bảo hương vị truyền thống nhưng vẫn phù hợp với khẩu vị hiện đại.
            </p>

            {/* Các điểm nhấn quan trọng */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <HeartIcon className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-xl font-semibold text-gray-900">Nấu ăn bằng trái tim</h4>
                  <p className="text-gray-600">Mỗi món ăn là một tác phẩm, được chế biến với sự tận tâm và tình yêu ẩm thực.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <SunIcon className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-xl font-semibold text-gray-900">Nguyên liệu sạch</h4>
                  <p className="text-gray-600">Cam kết sử dụng nguồn nguyên liệu hữu cơ, tươi mới mỗi ngày.</p>
                </div>
              </div>
            </div>

            <button
                className="mt-10 px-8 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 transition duration-300 transform hover:scale-105"
            >
                Tìm hiểu thêm về đội ngũ
            </button>

          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;