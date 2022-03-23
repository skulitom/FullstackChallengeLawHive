import { Card, CardContent, TextField, InputAdornment, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React, {useState} from 'react';
import { RestAPI } from '../api/RestAPI';

export interface JobPostingProps {
    _id: string,
    title: string,
    description: string,
    feeStructure: string,
    feePercentage: string,
    feeAmount: string,
    paidAmount: string,
    getJobs: Function
};

export default function JobPosting(props: JobPostingProps) {
    const [settlementAmount, setSettlementAmount] = useState(500);

    const handleSettlementAmountChange = (e: React.ChangeEvent) => {
        const target = e.target as HTMLTextAreaElement;
        setSettlementAmount(+target.value);
    };

    const payFixedFee = () => {
        let payFixedFee = new FormData();
        payFixedFee.append('id', props._id);
        RestAPI.payForJob(payFixedFee).then(res => {
            props.getJobs();
        });
    }

    const payVariableFee = () => {
        let payVariableFee = new FormData();
        payVariableFee.append('id', props._id);
        payVariableFee.append('settlementAmount', settlementAmount as unknown as string);
        RestAPI.payForJob(payVariableFee).then(res => {
            props.getJobs();
        });
    }

    const displayVariableFee = () => {
        if(!props.paidAmount) {
            return <><Typography align='right' color='red' variant='overline'>
                    {props.feeStructure + ': ' + props.feePercentage + '%'}
                    </Typography>
                    <hr />
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                    <TextField
                    id='outlined-number'
                    label='Settlement Amount'
                    value={settlementAmount}
                    onChange={(e) => handleSettlementAmountChange(e)}
                    type='number'
                    InputProps={{
                        startAdornment: <InputAdornment position='start'>£</InputAdornment>,
                    }}
                    />
                    <LoadingButton 
                        type='submit'
                        onClick={() => payVariableFee()}
                        fullWidth
                        variant='contained'
                    >
                        Pay
                    </LoadingButton>
                    </div>
            </>
        } else {
            return <>
                <hr />
                <Typography align='right' color='green' variant='overline'>
                {'PAID: £' + props.paidAmount}
                </Typography>
            </>
        }
    }

    const displayFixedFee = () => {
        if(!props.paidAmount){
            return <><Typography align='right' color='red' variant='overline'>
                {props.feeStructure + ': £' + props.feeAmount}
                </Typography>
                <hr />
                <LoadingButton 
                    type='submit'
                    onClick={() => payFixedFee()}
                    fullWidth
                    variant='contained'
                >
                    Pay
                </LoadingButton>
            </>
        } else {
            return <>
                <hr />
                <Typography align='right' color='green' variant='overline'>
                {'PAID: £' + props.paidAmount}
                </Typography>
            </>
        }
    }

    const displayFee = () => {
        if(props.feeStructure === 'no-win-no-fee') {
            return displayVariableFee();
        } else if (props.feeStructure === 'fixed-fee') {
            return displayFixedFee();
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