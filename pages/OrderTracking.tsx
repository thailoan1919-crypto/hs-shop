import React, { useState } from 'react';
import { Order } from '../types';
import { Search, Package, Calendar, User } from 'lucide-react';

interface OrderTrackingProps {
  orders: Order[];
}

const OrderTracking: React.FC<OrderTrackingProps> = ({ orders }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [foundOrder, setFoundOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    const order = orders.find(o => o.id.toLowerCase() === searchTerm.toLowerCase());
    setFoundOrder(order || null);
    setHasSearched(true);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Confirmed': return 'bg-blue-100 text-blue-800';
      case 'Shipped': return 'bg-purple-100 text-purple-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">訂單查詢</h2>
        <p className="text-gray-500">輸入您的訂單編號 (例如 HS-123456) 查詢最新進度。</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="請輸入訂單編號"
            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-brand-500 rounded-xl outline-none transition text-lg"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
          <button 
            type="submit"
            className="absolute right-2 top-2 bottom-2 bg-brand-600 text-white px-6 rounded-lg font-medium hover:bg-brand-700 transition"
          >
            查詢
          </button>
        </form>
      </div>

      {hasSearched && !foundOrder && (
        <div className="text-center p-8 bg-gray-50 rounded-2xl animate-in fade-in">
          <p className="text-gray-500">找不到此訂單編號，請檢查輸入是否正確。</p>
        </div>
      )}

      {foundOrder && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-4">
          <div className="bg-brand-600 p-6 text-white flex justify-between items-center">
             <div>
                <p className="text-brand-200 text-sm uppercase font-bold tracking-wider">Order ID</p>
                <h3 className="text-2xl font-mono font-bold">{foundOrder.id}</h3>
             </div>
             <div className={`px-4 py-1.5 rounded-full text-sm font-bold bg-white/20 backdrop-blur`}>
               {foundOrder.status}
             </div>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
                <div className="bg-brand-50 p-3 rounded-lg">
                    <Package className="w-6 h-6 text-brand-600" />
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 text-lg">{foundOrder.productName}</h4>
                    <p className="text-gray-500">規格: {foundOrder.specs} x {foundOrder.quantity}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                        <User className="w-4 h-4" /> 訂購人
                    </div>
                    <p className="font-medium text-gray-900">{foundOrder.customerName}</p>
                </div>
                <div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                        <Calendar className="w-4 h-4" /> 訂購日期
                    </div>
                    <p className="font-medium text-gray-900">{foundOrder.date}</p>
                </div>
            </div>

             {/* Simulated Progress Bar */}
             <div className="pt-4">
                <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                        className="absolute top-0 left-0 h-full bg-brand-500 rounded-full transition-all duration-1000"
                        style={{ width: foundOrder.status === 'Completed' ? '100%' : foundOrder.status === 'Shipped' ? '75%' : foundOrder.status === 'Confirmed' ? '50%' : '25%' }}
                    ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium">
                    <span>處理中</span>
                    <span>已確認</span>
                    <span>出貨中</span>
                    <span>完成</span>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;