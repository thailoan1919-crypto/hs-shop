export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

export interface Order {
  id: string;
  customerName: string;
  lineId: string;
  productId: string;
  productName: string;
  quantity: number;
  specs: string;
  status: 'Pending' | 'Confirmed' | 'Shipped' | 'Completed';
  date: string;
}

export type ViewState = 'HOME' | 'PRODUCTS' | 'TRACKING' | 'ADMIN';