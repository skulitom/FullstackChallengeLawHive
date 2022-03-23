import React, {useState, useEffect} from 'react';
import { Box, CircularProgress, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import JobPosting from '../components/JobPosting';
import { RestAPI } from '../api/RestAPI'

export interface DisplayJobsProps {
    updateJobs: boolean
}

function DisplayJobsSection(props: DisplayJobsProps) {
    const [jobPostings, setJobPostings] = useState([]);
    const [dataHasLoaded, setDataHasLoaded] = useState(false);

    useEffect(() => {
        setDataHasLoaded(false);
        getJobs();
    }, []);

    useEffect(() => {
        setDataHasLoaded(false);
        getJobs();
    }, [props.updateJobs]);
    
    const getJobs = () => {
    RestAPI.getJobPostings().then((res) => {
        let jobs: any = [];
        res.data.forEach((job: any) => {
        jobs.push({
            '_id': job._id,
            'title': job.title,
            'description': job.description,
            'feeStructure': job.feeStructure,
            'feePercentage': job.feePercentage,
            'feeAmount': job.feeAmount,
            'paidAmount': job.paidAmount
        });
        });
        setJobPostings(jobs);
        setDataHasLoaded(true);
    }).catch((err) => {
        setDataHasLoaded(false);
        console.error(err.response);
    });
    };

    const renderContent = () => {
        if(dataHasLoaded) {
          return <Stack gap={2} width={'100%'}>
              {jobPostings.map((job, index) => {
                  return <JobPosting
                    _id={job['_id']}
                    key={index}
                    title={job['title']}
                    description={job['description']}
                    feeStructure={job['feeStructure']}
                    feePercentage={job['feePercentage']}
                    feeAmount={job['feeAmount']}
                    paidAmount={job['paidAmount']}
                    getJobs={() => getJobs()}
                  />
              })}
          </Stack>;
        } else {
          return <CircularProgress />;
        }
      };

    return(<>
    <Grid
        item
        xs={false}
        sm={4}
        md={7}
    >
        <Box
        sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
        }}
        >
        {renderContent()}
        </Box>
    </Grid>
    </>);
}

export default DisplayJobsSection;