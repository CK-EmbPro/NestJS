import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import {  AllExceptionFilter } from './cats/allExceptions.filter';
import { HttpExceptionFilter } from './cats/http-exception.filter';
import { AuthGuard } from './Guards/roles.guard';
import { ValidationPipe } from './pipes/classBasedValidation';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const {httpAdapter} = app.get(HttpAdapterHost)
  // app.useGlobalFilters(new AllExceptionFilter(httpAdapter));
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalGuards(new AuthGuard())
  
  await app.listen(3000);
}
bootstrap();
