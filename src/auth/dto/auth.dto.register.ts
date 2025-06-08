import { IsEmail, IsString } from "class-validator";

export class userDtoRegister{
    @IsString()
    name: string;
    @IsString()
    nickname: string;
    @IsEmail()
    email: string;
    @IsString()
    dt_nasc: string;
    @IsString()
    password: string;
    type: number;
    @IsString()
    avatar: string;
    @IsString()
    estado: string;
    @IsString()
    genero: string;
}