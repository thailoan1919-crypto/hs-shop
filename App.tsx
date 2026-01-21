import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import OrderTracking from './pages/OrderTracking';
import AdminDashboard from './pages/AdminDashboard';
import OrderModal from './components/OrderModal';
import { ViewState, Product, Order } from './types';

// Mock initial data
const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: "NewJeans 2nd EP 'Get Up'",
    price: 650,
    image: 'https://picsum.photos/400/500?random=1',
    category: 'Album',
    description: "The highly anticipated 2nd EP featuring hit tracks Super Shy and ETA. Includes photobook and random card."
  },
  {
    id: '2',
    name: "IVE - THE 1st EP <I'VE MINE>",
    price: 580,
    image: 'https://picsum.photos/400/500?random=2',
    category: 'Album',
    description: "IVE's latest comeback featuring triple title tracks. Comes with various pre-order benefits."
  },
  {
    id: '3',
    name: "SEVENTEEN Official Light Stick Ver.3",
    price: 1500,
    image: 'https://picsum.photos/400/500?random=3',
    category: 'Merch',
    description: "The official carat bong ver.3 with improved bluetooth connectivity and color customization."
  },
  {
    id: '4',
    name: "AESPA Drama The 4th Mini Album",
    price: 620,
    image: 'https://picsum.photos/400/500?random=4',
    category: 'Album',
    description: "Experience the drama with Aespa's powerful new mini album. Giant version available."
  }
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Handlers
  const handleAddProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  const handleBuyClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleOrderSubmit = (order: Order) => {
    setOrders(prev => [order, ...prev]);
    // Don't close immediately so user can see success message
    setTimeout(() => {
        setSelectedProduct(null);
        setCurrentView('TRACKING'); // Redirect to tracking to encourage checking
    }, 2000);
  };

  const renderView = () => {
    switch (currentView) {
      case 'HOME':
        return <Home setView={setCurrentView} />;
      case 'PRODUCTS':
        return <ProductList products={products} onBuy={handleBuyClick} />;
      case 'TRACKING':
        return <OrderTracking orders={orders} />;
      case 'ADMIN':
        return <AdminDashboard onAddProduct={handleAddProduct} />;
      default:
        return <Home setView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar currentView={currentView} setView={setCurrentView} />
      
      <main className="flex-grow">
        {renderView()}
      </main>

      <footer className="bg-white border-t border-gray-100 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p className="font-bold text-brand-900 mb-2">HS代購 K-pop Shop</p>
          <p>&copy; {new Date().getFullYear()} HS代購. All rights reserved.</p>
          <p className="mt-2 text-xs text-gray-400">Designed with ❤️ for K-pop fans.</p>
        </div>
      </footer>

      {/* Global Order Modal */}
      {selectedProduct && (
        <OrderModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          onSubmit={handleOrderSubmit}
        />
      )}
    </div>
  );
};

export default App;