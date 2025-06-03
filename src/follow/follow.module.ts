import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowController } from './follow.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { follow } from './follow.entity';


@Module({
  imports:[TypeOrmModule.forFeature([follow])],
  providers: [FollowService],
  controllers: [FollowController],
  exports:[FollowService]
})
export class FollowModule {}
