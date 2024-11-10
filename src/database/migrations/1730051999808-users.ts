import { Entities } from '@/common/enums';
import { MigrationInterface } from 'typeorm';
import { MongoQueryRunner } from 'typeorm/driver/mongodb/MongoQueryRunner';

export class Users1730051999808 implements MigrationInterface {
  public async up(queryRunner: MongoQueryRunner): Promise<void> {
    try {
      await queryRunner.databaseConnection
        .db()
        .createCollection(Entities.USERS);
    } catch (error) {
      console.error(error);
    }
  }

  public async down(queryRunner: MongoQueryRunner): Promise<void> {
    try {
      await queryRunner.databaseConnection.db().dropCollection(Entities.USERS);
    } catch (error) {
      console.error(error);
    }
  }
}
