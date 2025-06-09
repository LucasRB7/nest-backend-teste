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
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: false, // só use true em dev, em prod use migrations!
      ssl: {
        rejectUnauthorized: false, // Railway exige SSL, desabilita validação para dev
      },
    }),
    UsersModule,
    AuthModule,
    SkinsModule,
    FollowModule,
    ModelCarsModule,
    NotificationsModule,
    ScheduleModule
    ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}