import React, { useState, useRef } from 'react';
import { Product } from '../types';
import { Plus, Upload, Sparkles, Loader2 } from 'lucide-react';
import { generateProductDescription } from '../services/geminiService';

interface AdminDashboardProps {
  onAddProduct: (product: Product) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onAddProduct }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Album');
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleGenerateDescription = async () => {
    if (!name) return;
    setIsGenerating(true);
    const desc = await generateProductDescription(name, category);
    setDescription(desc);
    setIsGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !imagePreview) return;

    const newProduct: Product = {
      id: Date.now().toString(),
      name,
      price: Number(price),
      category,
      description: description || "New arrival K-pop merchandise.",
      image: imagePreview
    };

    onAddProduct(newProduct);
    
    // Reset form
    setName('');
    setPrice('');
    setDescription('');
    setImagePreview('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    alert("商品上架成功！");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-lg border border-purple-100 overflow-hidden">
        <div className="bg-brand-900 p-8 text-white">
          <h2 className="text-3xl font-bold">後台管理</h2>
          <p className="text-brand-200 mt-2">上架新商品到 HS代購</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
            
            {/* Left Column: Image Upload */}
            <div className="space-y-4">
              <label className="block text-sm font-bold text-gray-700">商品圖片</label>
              <div 
                className={`aspect-[4/5] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors relative overflow-hidden ${
                  imagePreview ? 'border-brand-300 bg-gray-50' : 'border-gray-300 hover:border-brand-400 hover:bg-gray-50'
                }`}
                onClick={() => fileInputRef.current?.click()}
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-4">
                    <div className="bg-brand-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 text-brand-600">
                      <Upload className="w-6 h-6" />
                    </div>
                    <p className="text-sm text-gray-500 font-medium">點擊上傳照片</p>
                    <p className="text-xs text-gray-400 mt-1">支持 JPG, PNG</p>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageChange} 
                  accept="image/*" 
                  className="hidden" 
                />
              </div>
            </div>

            {/* Right Column: Details */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">商品名稱</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none"
                  placeholder="Ex: NewJeans 'How Sweet' Album"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">價格 (NTD)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 outline-none"
                    placeholder="850"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">分類</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 outline-none bg-white"
                  >
                    <option value="Album">Album</option>
                    <option value="Merch">Merch</option>
                    <option value="Photocard">Photocard</option>
                    <option value="Magazine">Magazine</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-bold text-gray-700">商品描述</label>
                  <button
                    type="button"
                    onClick={handleGenerateDescription}
                    disabled={!name || isGenerating}
                    className="text-xs flex items-center gap-1 text-brand-600 hover:text-brand-800 font-bold disabled:opacity-50"
                  >
                    {isGenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                    {isGenerating ? 'AI 生成中...' : 'AI 生成描述'}
                  </button>
                </div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 outline-none resize-none"
                  placeholder="輸入商品詳情..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-600 text-white py-4 rounded-xl font-bold hover:bg-brand-700 transition flex items-center justify-center gap-2 shadow-lg shadow-brand-200"
              >
                <Plus className="w-5 h-5" />
                上架商品
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;