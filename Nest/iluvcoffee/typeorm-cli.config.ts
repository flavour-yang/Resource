import { Flavor } from './src/coffees/entities/flavor.entity';
import { Coffee } from 'src/coffees/entities/coffee.entity';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'postgres',
  entities: [Coffee, Flavor],
  migrations: [],
});