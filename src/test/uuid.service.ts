import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';  // Importing uuidv4 from uuid package

@Injectable()
export class UuidService {
  generateUUID(): string {
    return uuidv4();  // Generate and return a UUID v4
  }
}