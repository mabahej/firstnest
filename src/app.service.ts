import { Injectable } from '@nestjs/common';
import { UuidService } from './test/uuid.service'; // Import UuidService
import { CommonModule } from './test/common.module';


@Injectable()
export class AppService {
  constructor(private readonly uuidService: UuidService) {}

  getUuid(): string {
    return this.uuidService.generateUUID();  // Use UuidService to generate and return a UUID
  }
}
