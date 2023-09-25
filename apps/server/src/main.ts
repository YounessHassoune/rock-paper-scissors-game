import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BaseWsExceptionFilter } from '@nestjs/websockets';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
