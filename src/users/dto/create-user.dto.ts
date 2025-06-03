import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto{
      @ApiProperty({example: 'Lucas Rodrigues Bevilaqua'})
      name: string;

      @ApiProperty({example: 'Lukinha'})
      nickname: string;

      @ApiProperty({example:'exemploemail@gmail.com'})
      email: string;

      @ApiProperty({example:'10/10/2000'})
      dt_nasc: string;

      @ApiProperty({example: 'SenhaSegura123!'})
      password: string;

      @ApiProperty({example: 'url/string da img'})
      avatar: string;   
      
      @ApiProperty({example: "PI, MA, RJ"})
      estado: string;
}