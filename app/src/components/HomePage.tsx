import { LoadingButton } from '@mui/lab';
import { Box, Slider, InputAdornment, Paper, Stack, TextField, Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
import { RestAPI } from '../api/RestAPI';
import DisplayJobsSection from './DisplayJobsSection';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

function HomePage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [updateJobs, setUpdateJobs] = useState(false);
  const [feeStructure, setFeeStructure] = useState('No-Win-No-Fee');
  const [feeAmount, setFeeAmount] = useState(0);
  const [feePercentage, setFeePercentage] = useState(20);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let newJob = new FormData();
    newJob.append('title', title);
    newJob.append('description', description);
    newJob.append('feeStructure', feeStructure);
    if (feeStructure==='No-Win-No-Fee') {
        newJob.append('feePercentage', feePercentage as unknown as string);
    } else if(feeStructure==='Fixed-Fee') {
        newJob.append('feeAmount', feeAmount as unknown as string);
    }
    RestAPI.createJobPosting(newJob);
    setUpdateJobs(!updateJobs);
  }

  const handleTitleChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLTextAreaElement;
    setTitle(target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLTextAreaElement;
    setDescription(target.value);
  };

  const handleFeePercentageChange = (e: Event) => {
    const target = e.target as HTMLTextAreaElement;
    setFeePercentage(+target.value);
  };

  const handleFeeAmountChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLTextAreaElement;
    setFeeAmount(+target.value);
  };

  const handleFeeStructureChange = (e: string) => {
    setFeeStructure(e);
  };

  const displayFeeInput = () => {
    if(feeStructure==='No-Win-No-Fee') {
      return <Stack spacing={2} direction='row' sx={{ mb: 2 }} alignItems='center'>
        <Typography variant='body1'>
            Fee%
        </Typography>
        <Slider 
            defaultValue={20} 
            value={feePercentage}
            onChange={(e) => handleFeePercentageChange(e)}
            aria-label='Default' 
            valueLabelDisplay='auto' 
        />
        </Stack>
    } else if(feeStructure==='Fixed-Fee') {
      return <TextField
        id='outlined-number'
        label='Fee Amount'
        value={feeAmount}
        onChange={(e) => handleFeeAmountChange(e)}
        type='number'
        InputProps={{
            startAdornment: <InputAdornment position='start'>£</InputAdornment>,
        }}
        />
    } else {
      console.error('Invalid fee structure')
      return <></>
    }
  }

  return (
    <Grid container component='main' sx={{ height: '100vh' }}>
    <CssBaseline />
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
        sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
        }}
        >
        <span>Law Hive 0.1</span>

        <Box component='form' noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
            <Stack gap={2} width={'100%'}>
            <TextField
                margin='normal'
                required
                fullWidth
                id='title'
                label='Title'
                name='title'
                onChange={(e) => handleTitleChange(e)}
                autoFocus
            />
            <TextField
                margin='normal'
                required
                fullWidth
                id='description'
                label='Description'
                name='description'
                multiline={true}
                onChange={(e) => handleDescriptionChange(e)}
                rows={6}
            />
            <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={feeStructure}
                label='Age'
                onChange={(e) => handleFeeStructureChange(e.target.value as string)}
            >
                <MenuItem value={'No-Win-No-Fee'}>No-Win-No-Fee</MenuItem>
                <MenuItem value={'Fixed-Fee'}>Fixed-Fee</MenuItem>
            </Select>
            {displayFeeInput()}
            <LoadingButton 
                type='submit'
                fullWidth
                variant='contained'
            >
                Create Job
            </LoadingButton>
            </Stack>
        </Box>
        </Box>
    </Grid>

    <DisplayJobsSection updateJobs={updateJobs} />
    </Grid>
  )
}

export default HomePage;