import { Controller, Get, Post, Body, UseInterceptors } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { Job } from './model/job.model'
import { FileInterceptor } from '@nestjs/platform-express';

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
        console.log(newJob);
        return this.jobService.addJob(newJob);
    }
}
