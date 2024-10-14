// src/todo/todo.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from './todo.entity';
import { StatusEnum } from './status.enum';
import { UpdateTodoDto } from './update-todo.dto';


@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  async createTodo(todo: TodoEntity): Promise<TodoEntity> {
    return this.todoRepository.save(todo);
  }
  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    await this.todoRepository.update(id, updateTodoDto);
    return this.todoRepository.findOne({ where: { id } }); // Récupérer l'entité mise à jour
  }
  async findOne(id: number): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOneBy({ id });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }
  async findAll(): Promise<TodoEntity[]> {
    return this.todoRepository.find();
  }
}
