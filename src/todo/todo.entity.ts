import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { StatusEnum } from './status.enum';
import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { ValidationMessages } from './validation-messages';
import { BaseEntity } from './BaseEntity'; // Ajustez le chemin si nécessaire

@Entity('todos')
export class TodoEntity extends BaseEntity {
  @PrimaryGeneratedColumn() // ID auto-incrémenté
  id: number;

  @IsNotEmpty({ message: ValidationMessages.REQUIRED })
  @IsString()
  @Length(3, 10, {
    message: `${ValidationMessages.NAME_MIN_LENGTH} ${ValidationMessages.NAME_MAX_LENGTH}`,
  })
  @Column({ length: 10 })
  name: string;

  @IsNotEmpty({ message: ValidationMessages.REQUIRED })
  @Length(10, undefined, {
    message: ValidationMessages.DESCRIPTION_MIN_LENGTH,
  })
  @Column({ type: 'text' })
  description: string;

  @IsEnum(StatusEnum)
  @Column({ type: 'enum', enum: StatusEnum })
  status: StatusEnum;
}
