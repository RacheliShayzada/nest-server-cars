import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SanitizeInputPipe } from './common/pipes/sanitize-input.pipe';  // ייבוא ה-Pipe הגלובלי

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // החלת ה-Pipe של הניקוי בצורה גלובלית
  app.useGlobalPipes(new SanitizeInputPipe());  // Pipe הגלובלי
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 2000);
}
bootstrap();
