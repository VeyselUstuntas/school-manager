import { Module } from '@nestjs/common';
import { ParentService } from './parent.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parent } from 'src/_common/typeorm';

@Module({
  providers: [ParentService],
  exports:[ParentService],
  imports:[TypeOrmModule.forFeature([Parent])]
})
export class ParentModule {}
  