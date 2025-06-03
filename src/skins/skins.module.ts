import { Module } from '@nestjs/common';
import { SkinsService } from './skins.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { skins } from './skins.entity';
import { SkinController } from './skins.controller';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { HttpModule } from '@nestjs/axios';
import { UsersService } from 'src/users/users.service';
import { NotificationsGateway } from 'src/notifications/notifications.gateway';
import { UsersModule } from 'src/users/users.module';

@Module({
      imports:[TypeOrmModule.forFeature([skins]), NotificationsModule, HttpModule, UsersModule],
      controllers: [SkinController],
      providers: [SkinsService]
})
export class SkinsModule {}
