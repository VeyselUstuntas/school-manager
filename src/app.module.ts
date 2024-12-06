import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConfig } from './_common/config';

@Module({
  imports: [
    StudentsModule,
    AuthModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [DatabaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      useFactory:(configService:ConfigService) => ({
        ...configService.get('database')
      }),
      inject:[ConfigService]

    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
