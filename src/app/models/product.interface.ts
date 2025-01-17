export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
  isNew: boolean;
  isOnSale: boolean;
  isHovered?: boolean;
}
