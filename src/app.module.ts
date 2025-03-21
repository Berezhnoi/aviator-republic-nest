import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { FirebaseSetup } from './firebase/firebase.setup';
import { RequestLoggerMiddleware } from './request-logger/request-logger.middleware';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';
import { Dialect } from 'sequelize/types';
import * as process from 'node:process';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: process.env.DB_DIALECT as Dialect,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadModels: true,
      synchronize: false,
      models: [User],
    }),
    SequelizeModule.forFeature([User]),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, FirebaseSetup],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
