// src/todo/todo.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service'; // You will create this service next
import { TodoControllerV1 } from './todo.controller.v1'; // You will create this controller next
import { TodoControllerV2 } from './todo.controller.v2';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Todo, User])], // Importing the TodoEntity
  providers: [TodoService, UserService],
  controllers: [TodoControllerV1, TodoControllerV2],
})
export class TodoModule {}
