import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { StatusEnum } from '../enum/status.enum';
import { IsEnum } from 'class-validator';
import { TimeStampEntity } from '../../Generics/TimeStamp.entity';

@Entity('todos')
export class Todo extends TimeStampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {})
  name: string;

  @Column('varchar', {})
  description: string;

  @IsEnum(StatusEnum)
  @Column({ type: 'enum', enum: StatusEnum })
  status: StatusEnum;

  @Column()
  userId: number;
}
