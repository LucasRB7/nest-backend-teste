import { Controller, Post, Param, UseGuards } from '@nestjs/common';
import { NotificationsGateway } from './notifications.gateway';
import axios from 'axios';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

UseGuards(JwtAuthGuard)
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationsGateway: NotificationsGateway) {}

  @Post('/:id/:skinsmsg')
  async sendNotification(
    @Param('id') id: number,
    @Param('skinsmsg') skinsmsg: string
  ){
    try {
        const response = await axios.get(`http://localhost:3000/follow/getfollowers/${id}`)
        const relations = response.data;
        const relationsFilter = relations.filter(e => e.follow == 1)
        relationsFilter.map(i =>{
            this.notificationsGateway.sendNotification(i.user_id,skinsmsg);
        })
        
        console.log(relationsFilter);
    } catch (error) {
        console.log(error)
    }
   }
}
