import { fa, faker } from '@faker-js/faker';
import { Product } from '../core/models/product.interface';

export class DataGenerator {
  static generateProduct(): Product {
    return {
      id: faker.number.int({ min: 1, max: 10000000 }),
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price()),
      category: faker.commerce.department(),
      brand: faker.company.name(),
      imageUrl: faker.image.url(), // This will generate a real image URL
      stock: faker.number.int({ min: 0, max: 1000 }),
      rating: faker.number.float({ min: 1, max: 5 }),
      reviews: faker.number.int({ min: 0, max: 500 }),
      isAvailable: faker.datatype.boolean(),
      isNew: faker.datatype.boolean(),
      isOnSale: faker.datatype.boolean(),
      isHovered: faker.datatype.boolean(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent()
    };
  }

  static generateProducts(count: number): Product[] {
    return Array.from({ length: count }, () => this.generateProduct());
  }
}
