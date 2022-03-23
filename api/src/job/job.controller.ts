import { Controller, Get, Post, Body, UseInterceptors } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { Job } from './model/job.model'
import { FileInterceptor } from '@nestjs/platform-express';
import { PayJobDto } from './dto/pay-job.dto';

@Controller('jobs')
export class JobController {
    constructor(private readonly jobService: JobService){}

    @Get('getAll')
    getAll(): Promise<Job[]> {
        return this.jobService.getAll();
    }

    @UseInterceptors(FileInterceptor('file'))
    @Post('createJob')
    createJob(@Body() newJob: CreateJobDto): Promise<Job> {
        return this.jobService.addJob(newJob);
    }

    @UseInterceptors(FileInterceptor('file'))
    @Post('payForJob')
    payForJob(@Body() payJob: PayJobDto): Promise<boolean> {
        return this.jobService.payForJob(payJob);
    }
}
