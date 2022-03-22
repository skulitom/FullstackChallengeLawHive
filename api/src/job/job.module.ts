import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { Job } from './model/job.model';

@Module({
  imports: [TypegooseModule.forFeature([Job])],
  controllers: [JobController],
  providers: [JobService]
})
export class JobModule {}
