// src/todo/todo.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from './entities/todo.entity';
import { StatusEnum } from './enum/status.enum';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Like } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  async createTodo(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const todo = this.todoRepository.create(createTodoDto);
    return this.todoRepository.save(todo);
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    await this.todoRepository.update(id, updateTodoDto);
    return this.todoRepository.findOne({ where: { id } });
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

  // Soft delete avec inclusion des enregistrements supprimés
  async softdeleteTodo(id: number): Promise<void> {
    const todo = await this.todoRepository.findOne({
      where: { id },
      withDeleted: true,
    });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    await this.todoRepository.softDelete(id);
  }

  async restoreTodo(id: number): Promise<void> {
    const todo = await this.todoRepository.findOne({
      where: { id },
      withDeleted: true, // Inclure les enregistrements supprimés
    });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    await this.todoRepository.restore(id);
  }
  async countTodosByStatus(): Promise<{
    pending: number;
    inProgress: number;
    completed: number;
  }> {
    const pendingCount = await this.todoRepository.count({
      where: { status: StatusEnum.PENDING },
    });
    const inProgressCount = await this.todoRepository.count({
      where: { status: StatusEnum.IN_PROGRESS },
    });
    const completedCount = await this.todoRepository.count({
      where: { status: StatusEnum.COMPLETED },
    });

    return {
      pending: pendingCount,
      inProgress: inProgressCount,
      completed: completedCount,
    };
  }
  async getFilteredTodos(
    test: string,
    status: StatusEnum,
  ): Promise<TodoEntity[]> {
    const todos = await this.todoRepository.find({
      where: [
        {
          status: status,
          name: Like(`%${test}%`),
        },
        {
          status: status,
          description: Like(`%${test}%`),
        },
      ],
    });

    return todos;
  }

  async getAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    data: TodoEntity[];
    total: number;
    page: number;
    limit: number;
  }> {
    const [result, total] = await this.todoRepository.findAndCount({
      where: { deletedAt: null },
      take: limit,
      skip: (page - 1) * limit,
    });

    return {
      data: result,
      total,
      page,
      limit,
    };
  }
}
