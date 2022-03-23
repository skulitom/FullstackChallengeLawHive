import {IsOptional} from 'class-validator';

export class CreateJobDto {
    readonly title: string;
    readonly description: string;
    readonly feeStructure: string;
    @IsOptional() readonly feePercentage: number;
    @IsOptional() readonly feeAmount: number;
}