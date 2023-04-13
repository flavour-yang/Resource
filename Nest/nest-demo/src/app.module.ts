import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsModule } from './cats/cats.module';
import { CatsService } from './cats/cats.service';
import { LoggerMiddleware } from './logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Cat } from './cats/entities/cat.entity';

@Module({
  imports: [
    CatsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456', //password
      database: 'myblog', //chitchat
      entities: [Cat],
      synchronize: true, // shouldn't be used in production - otherwise you can lose production data
    }),
  ],
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      // .exclude('cats/(.*)') // 排除监听的路由
      .forRoutes({ path: 'cats', method: RequestMethod.ALL }); // 监听对应的路由
  }
}

//执行顺序   middleware => Guards
//执行顺序   interceptor|pipe  => Guards
