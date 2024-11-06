import { IsEmpty, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { ValidationMessages } from '../validation-messages';
import { ApiProperty } from '@nestjs/swagger';
import { StatusEnum } from '../enum/status.enum'; // Swagger décorateur

export class CreateTodoDto {
  @ApiProperty({ description: 'Le nom du todo', example: 'Tâche 1' })
  @IsNotEmpty({ message: ValidationMessages.REQUIRED })
  @IsString({ message: ValidationMessages.REQUIRED })
  @Length(3, 10, {
    message: `${ValidationMessages.NAME_MIN_LENGTH} et ${ValidationMessages.NAME_MAX_LENGTH}`,
  })
  name: string;

  @ApiProperty({
    description: 'La description du todo',
    example: 'Compléter le projet',
  })
  @IsNotEmpty({ message: ValidationMessages.REQUIRED })
  @Length(10, undefined, {
    message: ValidationMessages.DESCRIPTION_MIN_LENGTH,
  })
  description: string;
  @ApiProperty({ description: 'Lae status du todo', example: 'PENDING' })
  status: StatusEnum;
  @IsEmpty()
  @IsOptional()
  userId: number;
}
