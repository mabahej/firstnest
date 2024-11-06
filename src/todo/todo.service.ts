// src/todo/todo.service.ts
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { StatusEnum } from './enum/status.enum';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Like } from 'typeorm';
import { User } from '../user/entities/user.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = this.todoRepository.create(createTodoDto);
    return this.todoRepository.save(todo);
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    await this.todoRepository.update(id, updateTodoDto);
    return this.todoRepository.findOne({ where: { id } });
  }
  async updatev2(
    id: number,
    updateTodoDto: UpdateTodoDto,
    user: User,
  ): Promise<Todo> {
    const todo = await this.findOne(id);
    const newTodo = await this.todoRepository.preload({
      id,
      ...updateTodoDto,
    });
    if (!newTodo) {
      throw new NotFoundException(`To do with id ${id} not found`);
    }
    if (todo.userId === user.id) {
      return await this.todoRepository.save(updateTodoDto);
    } else
      throw new UnauthorizedException(
        'You are not authorized to update this TO DO',
      );
  }

  async findOne(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOneBy({ id });
    if (!todo) {
      throw new NotFoundException(`Todo with ID not found`);
    }
    return todo;
  }

  async findAll(): Promise<Todo[]> {
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
  async softdeleteTodov2(id: number, user: User){
    const todoToRemove = await this.findOne(id);
    if (!todoToRemove) {
      throw new NotFoundException(`TODO with id ${id} not found`);
    }

    if (todoToRemove.userId === user.id) {
      return await this.todoRepository.softDelete(id);
    } else
      throw new UnauthorizedException(
        'You are not authorized to delete this TODO',
      );
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

  async getFilteredTodos(test: string, status: StatusEnum): Promise<Todo[]> {
    return this.todoRepository.findBy([
      {
        status: status,
        name: Like(`%${test}%`),
      },
      {
        status: status,
        description: Like(`%${test}%`),
      },
    ]);
  }

  async getAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    data: Todo[];
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
