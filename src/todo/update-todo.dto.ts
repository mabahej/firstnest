// src/todo/update-todo.dto.ts
import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { StatusEnum } from './status.enum'; // Ajustez le chemin si nécessaire
import { ValidationMessages } from './validation-messages'; // Ajustez le chemin si nécessaire

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  @Length(3, 10, {
    message: `${ValidationMessages.NAME_MIN_LENGTH} ${ValidationMessages.NAME_MAX_LENGTH}`,
  })
  name?: string;

  @IsOptional()
  @Length(10, undefined, {
    message: ValidationMessages.DESCRIPTION_MIN_LENGTH,
  })
  description?: string;

  @IsOptional()
  @IsEnum(StatusEnum, {
    message: ValidationMessages.INVALID_STATUS, // Créez un message pour les statuts invalides
  })
  status?: StatusEnum;
}
