import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesController } from './coffees/coffees.controller';
import { CoffeesService } from './coffees/coffees.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { ConfigModule } from '@nestjs/config';
// TypeOrmModule.forRoot({
//   type: 'postgres',
//   host: process.env.DATABASE_HOST,
//   port: +process.env.DATABASE_PORT,
//   username: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_NAME,
//   autoLoadEntities: true, // 自动加载模块
//   synchronize: true, // 是否同步, 生产中禁用(会根据entity 自动生成数据库表)
// }),
@Module({
  imports: [
    CoffeesModule,
    ConfigModule.forRoot({
      // ignoreEnvFile: true  // 忽略.env文件
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true, // 自动加载模块
      synchronize: true, // 是否同步, 生产中禁用(会根据entity 自动生成数据库表)
    }),
    CoffeeRatingModule,
  ],
  controllers: [AppController, CoffeesController],
  providers: [AppService],
})
export class AppModule {}
