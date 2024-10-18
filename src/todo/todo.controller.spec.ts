import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TodoEntity } from './entities/todo.entity';
import { StatusEnum } from './enum/status.enum';

describe('TodoController', () => {
  let controller: TodoController;
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: {
            createTodo: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TodoController>(TodoController);
    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a todo', async () => {
      const todo: Omit<TodoEntity, 'id' | 'createdAt'> = { name: 'Test', description: 'Test description', status: StatusEnum.PENDING };
      const result: TodoEntity = { id: 1, ...todo, createdAt: new Date() };

      jest.spyOn(service, 'createTodo').mockResolvedValue(result);

      expect(await controller.createTodo(todo.name, todo.description, todo.status)).toEqual(result);
      expect(service.createTodo).toHaveBeenCalledWith(todo);
    });
  });
  

 
});
