export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  imageUrl: string;
  stock: number;
  rating: number;
  reviews: number;
  isAvailable: boolean;
  isNew: boolean;
  isOnSale: boolean;
  isHovered?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
