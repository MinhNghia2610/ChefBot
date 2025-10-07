import React from 'react';

const blogPosts = [
    { id: 1, title: 'Bí quyết nấu Phở Bò ngon như người Hà Nội', date: '01/05/2025', summary: 'Tìm hiểu các bước cơ bản để có một nồi nước dùng phở bò thơm ngon, đậm đà chuẩn vị.' },
    { id: 2, title: '10 món ăn đường phố Việt Nam phải thử khi đến Sài Gòn', date: '15/04/2025', summary: 'Danh sách các món ăn vặt và món chính nổi tiếng không thể bỏ qua tại trung tâm thành phố.' },
    { id: 3, title: 'Lợi ích sức khỏe không ngờ từ Gỏi Cuốn', date: '01/04/2025', summary: 'Món ăn thanh mát, ít calo và giàu chất xơ này mang lại những lợi ích gì cho cơ thể bạn.' },
];

const BaiVietPage = () => {
  return (
    <div className="pt-24 pb-16 bg-white min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-4">
          Góc Ẩm Thực & Văn Hóa
        </h1>
        <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
          Các bài viết chuyên sâu về ẩm thực Việt Nam, bí quyết nấu ăn và câu chuyện văn hóa.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map(post => (
            <div key={post.id} className="bg-gray-50 p-6 rounded-xl shadow-lg transition duration-300 hover:shadow-red-100 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-2 hover:text-red-600 cursor-pointer">
                {post.title}
              </h3>
              <p className="text-sm text-gray-500 mb-3 italic">Ngày đăng: {post.date}</p>
              <p className="text-gray-700 mb-4 leading-relaxed">{post.summary}</p>
              <button
                className="text-red-600 font-semibold hover:text-red-800 transition duration-300"
              >
                Đọc tiếp →
              </button>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
            <button className="px-8 py-3 bg-red-100 text-red-600 font-semibold rounded-lg hover:bg-red-200 transition duration-300">
                Xem thêm bài viết
            </button>
        </div>
      </div>
    </div>
  );
};

export default BaiVietPage;