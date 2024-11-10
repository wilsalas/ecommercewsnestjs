import { Entities } from '@/common/enums';
import { MigrationInterface } from 'typeorm';
import { MongoQueryRunner } from 'typeorm/driver/mongodb/MongoQueryRunner';

export class Products1731197587461 implements MigrationInterface {
  public async up(queryRunner: MongoQueryRunner): Promise<void> {
    try {
      await queryRunner.databaseConnection
        .db()
        .createCollection(Entities.Products);
    } catch (error) {
      console.error(error);
    }
  }

  public async down(queryRunner: MongoQueryRunner): Promise<void> {
    try {
      await queryRunner.databaseConnection
        .db()
        .dropCollection(Entities.Products);
    } catch (error) {
      console.error(error);
    }
  }
}
