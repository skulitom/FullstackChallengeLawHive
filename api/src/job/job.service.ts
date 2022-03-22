import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { CreateJobDto } from './dto/create-job.dto';
import { Job } from './model/job.model';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class JobService {
    constructor(@InjectModel(Job) private readonly jobModel: ReturnModelType<typeof Job>) {}

    getAll(): Promise<Job[]> {
        return this.jobModel.find().exec();;
    }

    addJob(newJob: CreateJobDto): Promise<Job> {
        const createdJob = new this.jobModel(newJob);
        return createdJob.save();
    }
}
