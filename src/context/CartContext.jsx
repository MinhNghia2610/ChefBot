import React, { createContext, useState, useContext } from 'react';

// 1. Khởi tạo Context
const CartContext = createContext();

// 2. Component Provider để bọc ứng dụng và cung cấp dữ liệu
export const CartProvider = ({ children }) => {
  // State quản lý các món ăn trong giỏ hàng
  const [cartItems, setCartItems] = useState([]);

  // Hàm thêm món ăn vào giỏ hàng
  const addItemToCart = (item, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);

      if (existingItem) {
        // Nếu món ăn đã có, cập nhật số lượng
        return prevItems.map(i =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      } else {
        // Nếu món ăn chưa có, thêm mới
        return [...prevItems, { ...item, quantity }];
      }
    });
  };

  // Hàm cập nhật số lượng món ăn
  const updateItemQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItemFromCart(itemId);
      return;
    }

    setCartItems(prevItems => {
      return prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      );
    });
  };

  // Hàm xóa món ăn khỏi giỏ hàng
  const removeItemFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  // Tính tổng số lượng món ăn
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Tính tổng tiền (subtotal)
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Giá trị được cung cấp qua Context
  const contextValue = {
    cartItems,
    addItemToCart,
    updateItemQuantity,
    removeItemFromCart,
    totalItems,
    subtotal,
  };

  // PHẦN QUAN TRỌNG: Phải return Context.Provider
  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// 3. Custom Hook để sử dụng Context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    // Thêm kiểm tra lỗi để debug dễ hơn
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};