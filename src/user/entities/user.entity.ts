import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Todo } from '../../todo/entities/todo.entity';
import { TimeStampEntity } from '../../Generics/TimeStamp.entity';
import { CV } from '../../cv/entities/cv.entity';
import { UserRoleEnum } from 'src/Generics/Enums/role-user.enum';

@Entity('user')
export class User extends TimeStampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    unique: true,
  })
  username: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;
  @Column()
  salt: string;
  @OneToMany(() => CV, (cv) => cv.user, {
    nullable: true,
    cascade: ['insert', 'update'],
    onDelete: 'CASCADE',
  })
  cvs: CV[];
}
