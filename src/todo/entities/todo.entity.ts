import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { StatusEnum } from '../enum/status.enum';
import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { ValidationMessages } from '../validation-messages';
import { TimeStampEntity } from './TimeStamp.entity'; // Ajustez le chemin si nécessaire

@Entity('todos')
export class TodoEntity extends TimeStampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;


  @Column()
  name: string;
  @Column()
  description: string;

  @IsEnum(StatusEnum)
  @Column({ type: 'enum', enum: StatusEnum })
  status: StatusEnum;
}
