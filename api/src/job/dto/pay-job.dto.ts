import {IsOptional} from 'class-validator';

export class PayJobDto {
    readonly id: string;
    @IsOptional() readonly settlementAmount: string;
}