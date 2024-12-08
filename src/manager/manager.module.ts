import { Module } from '@nestjs/common';
import { ManagerController } from './manager.controller';
import { ManagerService } from './manager.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manager } from 'src/_common/typeorm';

@Module({
  controllers: [ManagerController],
  providers: [ManagerService],
  exports: [ManagerService], // authmodule içinde kullanım için export ettik.
  imports: [TypeOrmModule.forFeature([Manager])] // typeorm entitiy kullanımı için repo tanıtımı
})
export class ManagerModule { }
