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
}