import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

// Dữ liệu mẫu cho Lời chứng thực
const testimonialsData = [
    {
        quote: "Phở Đặc Biệt ở L2 Food thực sự là món Phở ngon nhất tôi từng ăn ở Sài Gòn. Nước dùng đậm đà, thịt bò mềm tan chảy. Phục vụ nhanh chóng và cực kỳ thân thiện!",
        name: "Nguyễn Văn A",
        title: "Khách hàng thường xuyên",
        avatar: "https://placehold.co/100x100/A3A3A3/FFFFFF?text=A"
    },
    {
        quote: "Món Bánh Mì Xíu Mại ở đây là phải thử! Vỏ bánh giòn rụm, nhân xíu mại thơm ngon, không quá ngấy. Tôi thường xuyên đặt hàng online vào buổi sáng.",
        name: "Lê Thị B",
        title: "Chuyên gia đánh giá ẩm thực",
        avatar: "https://placehold.co/100x100/D97706/FFFFFF?text=B"
    },
    {
        quote: "Tôi yêu không gian ấm cúng tại L2 Food. Cà phê Muối thơm và vừa miệng, rất phù hợp cho những buổi gặp gỡ bạn bè cuối tuần. Chất lượng 5 sao!",
        name: "Trần Minh C",
        title: "Blogger Du lịch & Ẩm thực",
        avatar: "https://placehold.co/100x100/10B981/FFFFFF?text=C"
    }
];

const Testimonials = () => {
    // Hàm tạo các ngôi sao xếp hạng
    const renderStars = (count = 5) => (
        <div className="flex space-x-1 justify-center mb-4">
            {[...Array(count)].map((_, i) => (
                <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
            ))}
        </div>
    );

    return (
        <section className="py-20 md:py-32 bg-white">
            <div className="container mx-auto px-4 md:px-8">
                
                {/* Tiêu đề */}
                <div className="text-center max-w-xl mx-auto mb-16">
                    <p className="text-red-600 font-semibold uppercase tracking-wider mb-2">
                        Khách Hàng Nói Gì
                    </p>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                        Những Trải Nghiệm Tuyệt Vời
                    </h2>
                </div>

                {/* Danh sách Lời chứng thực */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonialsData.map((testimonial, index) => (
                        <div 
                            key={index} 
                            className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 border-t-4 border-red-500 flex flex-col items-center text-center"
                        >
                            {renderStars()}
                            
                            <p className="text-lg text-gray-700 italic mb-6">
                                "{testimonial.quote}"
                            </p>
                            
                            {/* Thông tin Khách hàng */}
                            <img 
                                src={testimonial.avatar} 
                                alt={`Ảnh đại diện của ${testimonial.name}`}
                                className="w-16 h-16 rounded-full mx-auto mb-3 object-cover shadow-md"
                            />
                            <h4 className="text-xl font-bold text-gray-900">
                                {testimonial.name}
                            </h4>
                            <p className="text-sm text-red-600 font-medium">
                                {testimonial.title}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Kêu gọi hành động */}
                <div className="text-center mt-16">
                    <button
                        className="px-10 py-4 bg-red-600 text-white font-bold text-lg rounded-full shadow-xl hover:bg-red-700 transition duration-300 transform hover:scale-105"
                    >
                        Chia sẻ trải nghiệm của bạn
                    </button>
                </div>

            </div>
        </section>
    );
};

export default Testimonials;