// src/todo/todo.controller.v1.ts
import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
  Put,
  Param,
  Get,
  NotFoundException,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { StatusEnum } from './enum/status.enum';
import { Todo } from './entities/todo.entity';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { CreateTodoDto } from './dto/create-todo.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('todos')
@Controller({
  path: 'todos',
  version: '1',
})
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class TodoControllerV1 {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async createTodo(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoService.createTodo(createTodoDto);
  }
  @Patch(':id')
  async updateTodo(
    @Param('id') id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    return this.todoService.update(id, updateTodoDto);
  }

  @Get() // Cette méthode est responsable de la récupération de tous les todos
  findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }
  @Get(':id') // Récupérer un todo par son ID
  async findOne(@Param('id') id: number): Promise<Todo> {
    const todo = await this.todoService.findOne(id);
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }
  @Delete(':id')
  async deleteTodo(@Param('id') id: number): Promise<void> {
    return this.todoService.softdeleteTodo(id);
  }

  @Put('restore/:id')
  async restoreTodo(@Param('id') id: number): Promise<void> {
    return this.todoService.restoreTodo(id);
  }
  @Get('count/status')
  async countTodosByStatus(): Promise<{
    pending: number;
    inProgress: number;
    completed: number;
  }> {
    return this.todoService.countTodosByStatus();
  }

  @Post('search')
  async getFilteredTodos(
    @Query('searchTerm') searchTerm?: string,
    @Query('status') status?: StatusEnum,
  ): Promise<Todo[]> {
    return await this.todoService.getFilteredTodos(searchTerm, status);
  }

  @Post('all')
  async getAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<{
    data: Todo[];
    total: number;
    page: number;
    limit: number;
  }> {
    return await this.todoService.getAll(page, limit);
  }
}
