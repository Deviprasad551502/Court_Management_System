import { Module } from '@nestjs/common';
import { AdminModule } from '@adminjs/nestjs';

@Module({
  imports: [AdminModule],
})
export class AppModule {}
