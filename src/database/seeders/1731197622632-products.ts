import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { faker } from '@faker-js/faker/locale/en';
import { ProductCategory } from '@/common/enums';
import { Products } from '../entities';

export class Products1731197622632 implements Seeder {
  track = false;

  public async run(dataSource: DataSource): Promise<any> {
    try {
      const repository = dataSource.getMongoRepository(Products);
      await repository.deleteMany({});
      const products = Array.from({ length: 10 }).map(() => ({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price()),
        stock: faker.number.int({ min: 5, max: 100 }),
        category: faker.helpers.arrayElement(Object.values(ProductCategory)),
        createdAt: new Date(),
      }));
      await repository.save(products);
      console.log('Products created!');
    } catch (error) {
      console.error(error);
    }
  }
}
