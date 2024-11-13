import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { faker } from '@faker-js/faker/locale/en';
import { Role } from '@/common/enums';
import { Users } from '../entities';
import * as dotenv from 'dotenv';

dotenv.config();
const env = process.env;

export class Users1730997924699 implements Seeder {
  track = false;

  public async run(dataSource: DataSource): Promise<any> {
    try {
      const repository = dataSource.getMongoRepository(Users);
      await repository.deleteMany({});
      const password = env.PASSWORD_USERS_SEEDERS ?? faker.internet.password();
      const users = [
        {
          name: 'Wil',
          lastName: faker.person.lastName(),
          email: 'wil@mail.com',
          role: Role.ADMIN,
          image: faker.image.avatar(),
        },
        {
          name: faker.person.firstName(),
          lastName: faker.person.lastName(),
          email: faker.internet.email(),
          role: Role.ADMIN,
          image: faker.image.avatar(),
        },
        {
          name: faker.person.firstName(),
          email: faker.internet.email(),
          role: Role.ADMIN,
        },
        {
          name: faker.person.firstName(),
          lastName: faker.person.lastName(),
          email: faker.internet.email(),
          role: Role.USER,
          image: faker.image.avatar(),
        },
        {
          name: faker.person.firstName(),
          email: faker.internet.email(),
          role: Role.USER,
        },
      ];
      const usersMap = users.map((data) => {
        const user = new Users();
        user.name = data.name;
        user.lastName = data.lastName;
        user.email = data.email;
        user.password = password;
        user.role = data.role;
        user.image = data.image;
        return user;
      });
      await repository.save(usersMap);
      console.log('Users created!');
    } catch (error) {
      console.error(error);
    }
  }
}
