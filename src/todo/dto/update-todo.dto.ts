// src/todo/update-todo.dto.ts
import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { StatusEnum } from '../enum/status.enum'; // Ajustez le chemin si nécessaire
import { ValidationMessages } from '../validation-messages';
import { CreateTodoDto } from './create-todo.dto'; // Ajustez le chemin si nécessaire

export class UpdateTodoDto extends CreateTodoDto{}
