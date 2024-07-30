import { DataSource } from "typeorm";

export const connectionSource = new DataSource({
  migrationsTableName: 'migrations',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'postgres',
  entities: ['./src/**/*.entity{.js,.ts}'],
  migrations: ['src/migrations/**/*.js'],
  subscribers: ['dist/subscriber/**/*{.js,.ts}'],
});
// module.exports = {
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   password: '123456',
//   database: 'postgres',
//   entities: ['dist/**/*.entity.js'],
//   migrations: ['dist/migrations/*.js'],
//   cli: {
//     migrationsDir: 'src/migrations',
//   },
// };
