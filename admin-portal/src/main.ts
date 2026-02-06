import { NestFactory } from '@nestjs/core';
import { AdminModule } from '@adminjs/nestjs';

async function bootstrap() {
  const app = await NestFactory.create(AdminModule);
  await app.listen(3001);
}
bootstrap();
