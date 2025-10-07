import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Đảm bảo dòng này tồn tại và đúng đường dẫn
// 1. Import CartProvider
import { CartProvider } from './context/CartContext.jsx'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Bọc App bằng CartProvider */}
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>,
);