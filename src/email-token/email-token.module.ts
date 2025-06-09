import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailToken } from './email-token.entity';
import { EmailTokenService } from './email-token.service';
import { EmailTokenController } from './email-token.controller';
import { UsersModule } from 'src/users/users.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [TypeOrmModule.forFeature([EmailToken]),UsersModule,ScheduleModule],
  providers: [EmailTokenService],
  controllers:[EmailTokenController],
  exports: [EmailTokenService], // Exporta para ser usado em outros módulos, como AuthModule
})
export class EmailTokenModule {}
