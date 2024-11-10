import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { faker } from '@faker-js/faker/locale/en';
import { Roles } from '@/common/enums';
import { Users } from '../entities';

export class Users1730997924699 implements Seeder {
  track = false;

  public async run(dataSource: DataSource): Promise<any> {
    try {
      const repository = dataSource.getMongoRepository(Users);
      await repository.deleteMany({});
      const password = 'jn9D5nObYzts1oe';
      const users = [
        {
          name: 'Wil',
          lastName: faker.person.lastName(),
          email: 'wil@mail.com',
          role: Roles.ADMIN,
          image: faker.image.avatar(),
        },
        {
          name: faker.person.firstName(),
          lastName: faker.person.lastName(),
          email: faker.internet.email(),
          role: Roles.ADMIN,
          image: faker.image.avatar(),
        },
        {
          name: faker.person.firstName(),
          email: faker.internet.email(),
          role: Roles.ADMIN,
        },
        {
          name: faker.person.firstName(),
          lastName: faker.person.lastName(),
          email: faker.internet.email(),
          role: Roles.USER,
          image: faker.image.avatar(),
        },
        {
          name: faker.person.firstName(),
          email: faker.internet.email(),
          role: Roles.USER,
        },
      ];
      const usersMap = users.map((data) => {
        const user = new Users();
        user.name = data.name;
        user.lastName = data.lastName || '';
        user.email = data.email;
        user.password = password;
        user.role = data.role;
        user.image = data.image || '';
        return user;
      });
      await repository.save(usersMap);
      console.log('Users created!');
    } catch (error) {
      console.error(error);
    }
  }
}
