import { Card, CardContent, Typography } from '@mui/material';
import React from 'react'

export interface JobPostingProps {
    title: string,
    description: string
}

export default function JobPosting(props: JobPostingProps) {
    return(<>
        <Card variant='outlined'>
            <CardContent>
                <Typography variant="h5" component="div">
                    {props.title}
                </Typography>
                <Typography variant='body2'>
                    {props.description}
                </Typography>
            </CardContent>
        </Card>
    </>);
}

JobPosting.defaultProps = {
    title: '',
    description: ''
};