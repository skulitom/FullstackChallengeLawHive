import { Test, TestingModule } from '@nestjs/testing';
import { JobService } from './job.service';

describe('JobService', () => {
  let service: JobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobService],
    }).compile();

    service = module.get<JobService>(JobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should calculate correct fixed fee paid amount', () => {
    const newJobSchema = {
      title: 'testFixed',
      description: 'testFixed',
      feeStructure: 'fixed-fee',
      feePercentage: '',
      feeAmount: '50'
    };
    const newJob = service.getNewJob(newJobSchema);
    const result = service.calculateFeePaid(newJob, '');
    expect(result===newJob.feeAmount).toBeTruthy();
  });

  it('should calculate correct no win no fee paid amount', () => {
    const newJobSchema = {
      title: 'testFixed',
      description: 'testFixed',
      feeStructure: 'no-win-no-fee',
      feePercentage: '20',
      feeAmount: ''
    };
    const newJob = service.getNewJob(newJobSchema);
    const result = service.calculateFeePaid(newJob, '500');
    expect(result==='100').toBeTruthy();
  });
});
