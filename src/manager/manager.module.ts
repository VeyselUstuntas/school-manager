import { Module } from '@nestjs/common';
import { ManagerController } from './manager.controller';
import { ManagerService } from './manager.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manager } from 'src/_common/typeorm';

@Module({
  controllers: [ManagerController],
  providers: [ManagerService],
  exports: [ManagerService],
  imports: [TypeOrmModule.forFeature([Manager])]
})
export class ManagerModule { }
