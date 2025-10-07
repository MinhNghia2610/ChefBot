import React, { useState } from 'react';
import { Calendar, Users, Clock, Mail, Phone, User } from 'lucide-react';

const ReservationPage = () => {
    // State để lưu trữ dữ liệu form
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        date: '',
        time: '',
        guests: 1,
        notes: ''
    });

    // State để hiển thị thông báo và dữ liệu đã đặt
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submittedData, setSubmittedData] = useState(null);

    // Xử lý thay đổi input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Xử lý submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Lưu dữ liệu đã submit (tĩnh, không gửi lên server)
        setSubmittedData(formData);
        setIsSubmitted(true);
        
        // Reset form sau 3 giây để người dùng có thể đặt tiếp
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
                name: '',
                phone: '',
                email: '',
                date: '',
                time: '',
                guests: 1,
                notes: ''
            });
        }, 5000); // 5 giây
    };

    // Hàm tiện ích để tạo input field
    const InputField = ({ label, name, type = 'text', icon: Icon, min, max }) => (
        <div className="relative mb-6">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            {Icon && (
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 mt-2" />
            )}
            <input
                id={name}
                name={name}
                type={type}
                value={formData[name]}
                onChange={handleChange}
                required
                min={min}
                max={max}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150 ease-in-out placeholder-gray-500 ${Icon ? 'pl-10' : 'pl-4'} mt-1`}
                placeholder={`Nhập ${label.toLowerCase()}`}
            />
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-inter">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-5xl font-extrabold text-gray-900 mb-2">
                        Đặt Bàn Dễ Dàng
                    </h2>
                    <p className="text-xl text-gray-600">
                        Chúng tôi mong được chào đón bạn. Vui lòng điền thông tin chi tiết của bạn.
                    </p>
                </div>

                <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-100">
                    {isSubmitted ? (
                        <div className="text-center p-8 bg-green-50 rounded-xl">
                            <svg className="w-16 h-16 text-green-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <h3 className="text-3xl font-bold text-green-800 mb-3">
                                Đặt Bàn Thành Công!
                            </h3>
                            <p className="text-gray-700 mb-6">
                                Cảm ơn bạn, đơn đặt bàn của bạn đã được ghi nhận. Chúng tôi sẽ liên hệ xác nhận sớm.
                            </p>
                            
                            <div className="text-left inline-block bg-white p-6 rounded-lg shadow-inner">
                                <h4 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
                                    Chi tiết đặt bàn (Tĩnh)
                                </h4>
                                <p><strong>Tên:</strong> {submittedData.name}</p>
                                <p><strong>Liên hệ:</strong> {submittedData.phone} / {submittedData.email}</p>
                                <p><strong>Ngày & Giờ:</strong> {submittedData.date} lúc {submittedData.time}</p>
                                <p><strong>Số lượng khách:</strong> {submittedData.guests}</p>
                                {submittedData.notes && <p><strong>Ghi chú:</strong> {submittedData.notes}</p>}
                            </div>
                            
                            <p className="mt-4 text-sm text-gray-500">
                                (Lưu ý: Dữ liệu này không được lưu trữ vĩnh viễn vì không sử dụng database.)
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Thông tin liên hệ */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <InputField label="Họ và Tên" name="name" icon={User} />
                                <InputField label="Số điện thoại" name="phone" type="tel" icon={Phone} />
                                <InputField label="Email" name="email" type="email" icon={Mail} />
                            </div>

                            <hr className="border-gray-200" />
                            
                            {/* Chi tiết đặt bàn */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <InputField label="Chọn Ngày" name="date" type="date" icon={Calendar} 
                                    min={new Date().toISOString().split('T')[0]} // Ngày tối thiểu là ngày hiện tại
                                />
                                <InputField label="Chọn Giờ" name="time" type="time" icon={Clock} />
                                
                                {/* Số lượng khách */}
                                <div className="relative mb-6">
                                    <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
                                        Số lượng khách
                                    </label>
                                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 mt-2" />
                                    <input
                                        id="guests"
                                        name="guests"
                                        type="number"
                                        value={formData.guests}
                                        onChange={handleChange}
                                        required
                                        min="1"
                                        max="10" // Giả sử tối đa 10 khách/bàn
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150 ease-in-out placeholder-gray-500 mt-1"
                                    />
                                </div>
                            </div>

                            {/* Ghi chú */}
                            <div>
                                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                                    Ghi chú thêm (Ví dụ: Yêu cầu bàn gần cửa sổ, tiệc sinh nhật...)
                                </label>
                                <textarea
                                    id="notes"
                                    name="notes"
                                    rows="3"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150 ease-in-out placeholder-gray-500"
                                    placeholder="Nhập ghi chú của bạn..."
                                ></textarea>
                            </div>
                            
                            {/* Nút đặt bàn */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full flex justify-center items-center py-3 px-6 border border-transparent rounded-xl shadow-lg text-lg font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-200 ease-in-out transform hover:scale-[1.01] active:scale-[0.99]"
                                >
                                    Xác Nhận Đặt Bàn
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                <div className="mt-12 text-center text-gray-500 text-sm">
                    Nếu bạn có bất kỳ câu hỏi nào, vui lòng gọi đến Hotline: (028) XXXX-XXXX
                </div>
            </div>
        </div>
    );
};

export default ReservationPage;