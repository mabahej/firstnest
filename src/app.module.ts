import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './test/common.module';
import { TodoModule } from './todo/todo.module'; // Import TodoModulenpm install @nestjs/typeorm typeorm pg
import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeOrmModule
@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forRoot({
      type: 'mysql', // Change this according to your database type
      host: 'localhost', // Corrected host
      port: 3306,
      username: 'root', // Update this according to your database configuration
      password: '',     // Update this according to your database configuration
      database: 'todo', // Name of your database
      autoLoadEntities: true, 
      synchronize: true, 
      logging: true
    }),
    TodoModule, // Corrected extra comma issue
  ],
  providers: [AppService],
  controllers: [AppController], // AppController must be registered here
})
export class AppModule {}