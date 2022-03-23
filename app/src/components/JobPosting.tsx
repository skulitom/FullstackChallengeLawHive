import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';

export interface JobPostingProps {
    title: string,
    description: string,
    feeStructure: string,
    feePercentage: string,
    feeAmount: string
};

export default function JobPosting(props: JobPostingProps) {
    const displayFee = () => {
        if(props.feeStructure === 'no-win-no-fee') {
            return <Typography align='right' variant='overline'>
            {props.feeStructure + ': ' + props.feePercentage + '%'}
        </Typography>
        } else if (props.feeStructure === 'fixed-fee') {
            return <Typography align='right' variant='overline'>
            {props.feeStructure + ': £' + props.feeAmount}
        </Typography>
        } else {
            console.error('Job has incorrect fee structure')
            return <></>
        }
    }

    return(<>
        <Card variant='outlined'>
            <CardContent>
                <Typography variant='h5' component='div'>
                    {props.title}
                </Typography>
                <Typography variant='body2'>
                    {props.description}
                </Typography>
                {displayFee()}
            </CardContent>
        </Card>
    </>);
}

JobPosting.defaultProps = {
    title: '',
    description: ''
};