import { IsString } from 'class-validator';

export class userDtoLogin {
  @IsString()
  nickname: string;

  @IsString()
  password: string;
}