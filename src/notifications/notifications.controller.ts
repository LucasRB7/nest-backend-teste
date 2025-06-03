import { Controller, Post, Param, UseGuards } from '@nestjs/common';
import { NotificationsGateway } from './notifications.gateway';
import { FollowService } from 'src/follow/follow.service';

@Controller('notifications')
export class NotificationController {
  constructor(
    private readonly notificationsGateway: NotificationsGateway,
    private readonly followService: FollowService
  ) {}

  @Post('/:id/:skinsmsg')
  async sendNotification(
    @Param('id') id: number,
    @Param('skinsmsg') skinsmsg: string
  ){
    try {
        const resolve = await this.followService.GetFollowers(id)
        const relations = resolve
        const relationsFilter = relations.filter(e => e.follow == 1)
        relationsFilter.map(i =>{
            this.notificationsGateway.sendNotification(i.user_id,skinsmsg);
        })
    } catch (error) {
        console.log(error)
    }
   }
}
