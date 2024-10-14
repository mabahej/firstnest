import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('uuid')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getUuid(): string {
    return this.appService.getUuid();  // Call the service to generate and return a UUID
  }}