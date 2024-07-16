import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesController } from './coffees/coffees.controller';
import { CoffeesService } from './coffees/coffees.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CoffeesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'postgres',
      autoLoadEntities: true, // 自动加载模块
      synchronize: true, // 是否同步, 生产中禁用(会根据entity 自动生成数据库表)
    }),
  ],
  controllers: [AppController, CoffeesController],
  providers: [AppService, CoffeesService],
})
export class AppModule {}
