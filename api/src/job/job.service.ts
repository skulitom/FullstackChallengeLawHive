import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { CreateJobDto } from './dto/create-job.dto';
import { Job } from './model/job.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { PayJobDto } from './dto/pay-job.dto';

@Injectable()
export class JobService {
    constructor(@InjectModel(Job) private readonly jobModel: ReturnModelType<typeof Job>) {}

    getAll(): Promise<Job[]> {
        return this.jobModel.find().exec();;
    };

    addJob(newJob: CreateJobDto): Promise<Job> {
        const createdJob = new this.jobModel(newJob);
        return createdJob.save();
    };

    getNewJob(newJob: CreateJobDto): Job {
        return new this.jobModel(newJob);
    };

    async payForJob(payJob: PayJobDto): Promise<boolean> {
        const job = await this.jobModel.findById(payJob.id).exec();
        const paidAmount = this.calculateFeePaid(job, payJob.settlementAmount);
        if (paidAmount) {
            job.paidAmount = paidAmount;
            job.settlementAmount = payJob.settlementAmount;
            await job.save();
            return true;
        } else {
            return false;
        }
    }

    calculateFeePaid(job: Job, settlementAmount: string): string {
        if(job.feeStructure === 'no-win-no-fee' && !isNaN(settlementAmount as unknown as number)) {
            return (+settlementAmount * (+job.feePercentage/100)) as unknown as string;
        } else if (job.feeStructure === 'fixed-fee') {
            return job.feeAmount;
        }
        return '';
    };
}
