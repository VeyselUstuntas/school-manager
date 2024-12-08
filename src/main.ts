import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './_common/exceptions/http.exception.filter';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //api prefix'i eklendi
  app.setGlobalPrefix('api');
  // validation hataları için
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors: ValidationError[]) => {
      const findFirstError = (errors: ValidationError[]) => {
        for (let error of errors) {
          if (error.constraints) {
            return Object.values(error.constraints)[0]; // amac ilk hatayı yakalamak ve tek bir hata döndürmek bunu dizi haline getirdik
          }
        }
      }
      const firstErr = findFirstError(errors);
      return new BadRequestException(firstErr);
    }
  }));

  // exceptionları filterlemek-işlemek için 
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
