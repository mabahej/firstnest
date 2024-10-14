import { Global, Module } from '@nestjs/common';
import { UuidService } from './uuid.service'; // Import the UuidService class from the uuidservice.ts file

@Global()
@Module({
    providers: [UuidService],
    exports: [UuidService],  // Make sure to export UuidService
  })
  export class CommonModule {}