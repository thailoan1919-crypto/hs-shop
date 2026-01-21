import React, { useState } from 'react';
import { Product, Order } from '../types';
import { X, CheckCircle } from 'lucide-react';

interface OrderModalProps {
  product: Product;
  onClose: () => void;
  onSubmit: (order: Order) => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ product, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [lineId, setLineId] = useState('');
  const [specs, setSpecs] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrderId = `HS-${Date.now().toString().slice(-6)}`;
    const order: Order = {
      id: newOrderId,
      customerName: name,
      lineId,
      productId: product.id,
      productName: product.name,
      quantity,
      specs,
      status: 'Pending',
      date: new Date().toLocaleDateString(),
    };
    
    setOrderId(newOrderId);
    setIsSubmitted(true);
    onSubmit(order);
  };

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl scale-100 transform transition-all">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">訂購成功!</h2>
          <p className="text-gray-500 mb-6">您的訂單編號是:</p>
          <div className="bg-brand-50 border-2 border-brand-100 rounded-xl p-4 mb-6">
            <span className="text-2xl font-mono font-bold text-brand-700 tracking-wider">{orderId}</span>
          </div>
          <p className="text-sm text-gray-400 mb-6">請截圖保存此畫面，以便日後查詢。</p>
          <button
            onClick={onClose}
            className="w-full bg-brand-600 text-white py-3 rounded-xl font-bold hover:bg-brand-700 transition"
          >
            完成
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-brand-50">
          <h3 className="font-bold text-lg text-brand-900">填寫訂購單</h3>
          <button onClick={onClose} className="p-1 hover:bg-white rounded-full transition text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar">
          <div className="flex gap-4 mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg object-cover bg-white" />
            <div>
              <h4 className="font-bold text-gray-900 line-clamp-1">{product.name}</h4>
              <p className="text-brand-600 font-bold">${product.price.toLocaleString()}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">真實姓名</label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition"
                placeholder="請輸入您的姓名"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">LINE ID</label>
              <input
                required
                type="text"
                value={lineId}
                onChange={(e) => setLineId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition"
                placeholder="方便聯繫與通知"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">商品規格 / 備註</label>
              <textarea
                required
                value={specs}
                onChange={(e) => setSpecs(e.target.value)}
                rows={2}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition resize-none"
                placeholder="例如：版本 A, 特典卡成員..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">數量</label>
              <div className="flex items-center gap-4">
                <button 
                  type="button" 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                >
                  -
                </button>
                <span className="text-xl font-bold w-8 text-center">{quantity}</span>
                <button 
                  type="button" 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 mt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">總金額</span>
                <span className="text-2xl font-bold text-brand-700">${(product.price * quantity).toLocaleString()}</span>
              </div>
              <button
                type="submit"
                className="w-full bg-brand-600 text-white py-3.5 rounded-xl font-bold text-lg hover:bg-brand-700 active:scale-[0.98] transition shadow-lg shadow-brand-200"
              >
                確認送出
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;