import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailToken } from './email-token.entity';
import { EmailTokenService } from './email-token.service';
import { EmailTokenController } from './email-token.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([EmailToken]),UsersModule],
  providers: [EmailTokenService],
  controllers:[EmailTokenController],
  exports: [EmailTokenService], // Exporta para ser usado em outros módulos, como AuthModule
})
export class EmailTokenModule {}
