import { Product } from '../core/models/product.interface';
import { DataGenerator } from './data-generator';

export const MOCK_PRODUCTS: Product[] = DataGenerator.generateProducts(100);
