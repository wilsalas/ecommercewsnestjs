import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { SeederOptions } from 'typeorm-extension';

dotenv.config();
const env = process.env;

const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'mongodb',
  host: env.DB_HOST,
  port: Number(env.DB_PORT),
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  synchronize: true,
  useUnifiedTopology: true,
  entities: [env.TYPEORM_ENTITIES || ''],
  migrations: [env.TYPEORM_MIGRATIONS || ''],
  seeds: [env.TYPEORM_SEEDERS || ''],
};

export default new DataSource(dataSourceOptions);
