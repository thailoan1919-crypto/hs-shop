import React from 'react';
import { Product } from '../types';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onBuy: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onBuy }) => {
  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold text-brand-700 shadow-sm uppercase">
          {product.category}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 line-clamp-1 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 mb-4 h-10">{product.description}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-extrabold text-brand-600">
            ${product.price.toLocaleString()}
          </span>
          <button
            onClick={() => onBuy(product)}
            className="flex items-center gap-2 bg-brand-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-brand-700 active:scale-95 transition-all shadow-brand-200 shadow-lg"
          >
            <ShoppingCart className="w-4 h-4" />
            購買
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;