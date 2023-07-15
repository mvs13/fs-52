import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// Работа с конфигурационным файлом
import { ConfigModule } from '@nestjs/config';
// Подключение БД
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Category } from './category/entities/category.entity';
import { CategoryModule } from './category/category.module';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/entities/post.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CategoryModule,
    PostsModule,
    // Подключение БД
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      // host: 'schoolyz.beget.tech',
      port: 3306,
      username: process.env.DB_USER,
      // username: 'schoolyz_events',
      password: process.env.DB_PASSWD,
      // password: 'Dxb&&qt0',
      database: process.env.DB_NAME,
      // database: 'schoolyz_events',
      entities: [Category, Post, User],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {
  // Подключение БД
  constructor(private dataSource: DataSource) {}
}
