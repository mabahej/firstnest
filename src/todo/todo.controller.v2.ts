import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { UserService } from '../user/user.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Controller({
  path: 'todos',
  version: '2',
})
export class TodoControllerV2 {
  constructor(
    private readonly todoService: TodoService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(@Body() createCvDto: CreateTodoDto, @Req() req: Request) {
    const userId = req['userId'];
    const user = await this.userService.findOne(userId);
    console.log('user', user);
    console.log('createCvDto', createCvDto);
    createCvDto.userId = userId;
    return await this.todoService.createTodo(createCvDto);
  }

  @Patch(':id')
  async update(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCvDto: UpdateTodoDto,
  ): Promise<Todo> {
    const userId = req['userId'];
    const user = await this.userService.findOne(userId);
    console.log('user', user);
    return await this.todoService.updatev2(id, updateCvDto, user);
  }

  @Delete(':id')
  async delete(@Req() req: Request, @Param('id') id: number) {
    const userId = req['userId'];
    const user = await this.userService.findOne(userId);
    return await this.todoService.softdeleteTodov2(id, user);
  }
}
