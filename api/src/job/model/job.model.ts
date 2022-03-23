import {prop} from '@typegoose/typegoose'

export class Job {
    @prop({
        required: true,
        lowercase: true,
        trim: true,
    })
    title: string;

    @prop({
        required: true,
        lowercase: true,
        trim: true,
    })
    description: string;

    @prop({
        required: true,
        lowercase: true,
        trim: true,
    })
    feeStructure: string;

    @prop({
        required: false,
        lowercase: true,
        trim: true,
    })
    feePercentage: string;

    @prop({
        required: false,
        lowercase: true,
        trim: true,
    })
    feeAmount: string;

    @prop({
        required: false,
        lowercase: true,
        trim: true,
    })
    settlementAmount: string;

    @prop({
        required: false,
        lowercase: true,
        trim: true,
    })
    paidAmount: string;
}