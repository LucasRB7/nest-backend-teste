import { Module } from '@nestjs/common';
import { NotificationsGateway } from './notifications.gateway';
import { NotificationController } from './notifications.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports:[HttpModule],
    providers: [NotificationsGateway],
    controllers: [NotificationController] ,
    exports: [NotificationsGateway],
})
export class NotificationsModule {}
