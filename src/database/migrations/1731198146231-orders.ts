import { Entities } from '@/common/enums';
import { MigrationInterface } from 'typeorm';
import { MongoQueryRunner } from 'typeorm/driver/mongodb/MongoQueryRunner';

export class Orders1731198146231 implements MigrationInterface {
  public async up(queryRunner: MongoQueryRunner): Promise<void> {
    try {
      await queryRunner.databaseConnection
        .db()
        .createCollection(Entities.ORDERS);
    } catch (error) {
      console.error(error);
    }
  }

  public async down(queryRunner: MongoQueryRunner): Promise<void> {
    try {
      await queryRunner.databaseConnection.db().dropCollection(Entities.ORDERS);
    } catch (error) {
      console.error(error);
    }
  }
}
