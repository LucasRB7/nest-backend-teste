import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { SkinsModule } from './skins/skins.module';
import { FollowModule } from './follow/follow.module';
import { ModelCarsModule } from './model.cars/model.cars.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'mysql',  
      host: process.env.DB_HOST,
      port: 10005,  
      username: 'root', 
      password: 'root',  
      database: 'bd_dev', 
      entities: [__dirname + '/**/*.entity{.ts,.js}']  
    }),
    UsersModule,
    AuthModule,
    SkinsModule,
    FollowModule,
    ModelCarsModule,
    NotificationsModule
    ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}