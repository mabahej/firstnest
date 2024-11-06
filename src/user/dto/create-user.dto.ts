import { IsNotEmpty, ValidateNested, IsString, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;
  @ApiProperty()

  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty()

  @IsNotEmpty()
  @IsString()
  password: string;


}
