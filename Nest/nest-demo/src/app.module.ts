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
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    CatsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password', //password
      database: 'myblog', //chitchat
      entities: [User],
      synchronize: true, // shouldn't be used in production - otherwise you can lose production data
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController, CatsController, UsersController, AuthController],
  providers: [AppService, CatsService, UsersService, AuthService],
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
