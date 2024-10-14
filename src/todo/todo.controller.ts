// src/todo/todo.controller.ts
import { Controller, Post, Body, ValidationPipe, UsePipes, Put, Param, Get, NotFoundException } from '@nestjs/common';
import { TodoService } from './todo.service';
import { StatusEnum } from './status.enum';
import { TodoEntity } from './todo.entity';
import { UpdateTodoDto } from './update-todo.dto';
@Controller('todos')
@UsePipes(new ValidationPipe({ transform: true  ,  whitelist: true}))
export class TodoController {

  constructor(private readonly todoService: TodoService) {}

  @Post()
  async createTodo(
    @Body() todo: TodoEntity, // Accept the whole TodoEntity object
  ): Promise<TodoEntity> {
    return this.todoService.createTodo(todo);
  }
  @Put(':id')
  async updateTodo(
    @Param('id') id: number,
    @Body() updateTodoDto: UpdateTodoDto, // Utilisez le DTO de mise à jour
  ): Promise<TodoEntity> {
    return this.todoService.update(id, updateTodoDto);
  }

  @Get() // Cette méthode est responsable de la récupération de tous les todos
  findAll(): Promise<TodoEntity[]> {
    return this.todoService.findAll();
  }
  @Get(':id') // Récupérer un todo par son ID
  async findOne(@Param('id') id: number): Promise<TodoEntity> {
    const todo = await this.todoService.findOne(id);
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  // Other endpoints (e.g., get all todos, get a todo by id, etc.) can be added here
}
