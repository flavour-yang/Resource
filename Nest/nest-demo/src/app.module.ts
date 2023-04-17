import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from './logger.middleware';
import { DataSource } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CatsController } from './cats/cats.controller';
import { CatsModule } from './cats/cats.module';
import { CatsService } from './cats/cats.service';
import { Cats } from './cats/entities/cats.entity';

import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    CatsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password', //password
      database: 'chitchat', //chitchat
      entities: [User],
      synchronize: true, // shouldn't be used in production - otherwise you can lose production data
    }),
    UsersModule,
  ],
  controllers: [AppController, CatsController, UsersController],
  providers: [AppService, CatsService, UsersService],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware);
    // .exclude('cats/(.*)') // 排除监听的路由
    // .forRoutes({ path: 'cats', method: RequestMethod.ALL })
  }
}

//执行顺序   middleware => Guards
//执行顺序   interceptor|pipe  => Guards
