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
      const generatedNames = new Set<string>();
      const products = Array.from({ length: 100 }).map(() => {
        let name: string;
        do {
          name = faker.commerce.productName();
        } while (generatedNames.has(name));
        generatedNames.add(name);
        const category = faker.helpers.arrayElement(
          Object.values(ProductCategory),
        );
        return {
          name,
          description: faker.commerce.productDescription(),
          price: parseFloat(faker.commerce.price()),
          stock: faker.number.int({ min: 1, max: 100 }),
          image: faker.image.urlLoremFlickr({
            width: 640,
            height: 480,
            category,
          }),
          category,
        };
      });
      const newProducts = repository.create(products);
      await repository.save(newProducts);
      console.log('Products created!');
    } catch (error) {
      console.error(error);
    }
  }
}
