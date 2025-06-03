import { Module } from '@nestjs/common';
import { SkinsService } from './skins.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { skins } from './skins.entity';
import { SkinController } from './skins.controller';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { HttpModule } from '@nestjs/axios';

@Module({
      imports:[TypeOrmModule.forFeature([skins]), NotificationsModule, HttpModule],
      controllers: [SkinController],
      providers: [SkinsService]
})
export class SkinsModule {}
