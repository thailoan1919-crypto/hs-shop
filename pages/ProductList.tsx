import React from 'react';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

interface ProductListProps {
  products: Product[];
  onBuy: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onBuy }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">所有商品</h2>
          <p className="text-gray-500 mt-2">最新上架的專輯與周邊</p>
        </div>
        <span className="bg-brand-100 text-brand-800 px-3 py-1 rounded-full text-sm font-medium">
          {products.length} Items
        </span>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
          <p className="text-gray-400 text-lg">目前尚無商品，請稍後再回來查看。</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onBuy={onBuy} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;