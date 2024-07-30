import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'postgres',
  synchronize: true,
  logging: true,
  // entities: ['../src/coffees/entities/*.entity{.js,.ts}'],
  entities: ['/src/**/*.entity{.ts,.js}'],
  subscribers: [],
  migrations: [],
})