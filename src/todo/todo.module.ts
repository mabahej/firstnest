// src/todo/todo.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './todo.entity';
import { TodoService } from './todo.service'; // You will create this service next
import { TodoController } from './todo.controller'; // You will create this controller next
@Module({
    
  imports: [TypeOrmModule.forFeature([TodoEntity])], // Importing the TodoEntity
  providers: [TodoService],
  controllers: [TodoController],
})
export class TodoModule {}
