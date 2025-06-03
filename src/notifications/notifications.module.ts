import { Module } from '@nestjs/common';
import { NotificationsGateway } from './notifications.gateway';
import { NotificationController } from './notifications.controller';
import { HttpModule } from '@nestjs/axios';
import { FollowModule } from 'src/follow/follow.module';

@Module({
    imports:[HttpModule, FollowModule],
    providers: [NotificationsGateway],
    controllers: [NotificationController] ,
    exports: [NotificationsGateway],
})
export class NotificationsModule {}
