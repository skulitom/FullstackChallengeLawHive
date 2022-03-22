import { LoadingButton } from '@mui/lab'
import { Box, CircularProgress, Paper, Stack, TextField } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import React, { useEffect, useState } from 'react'
import { RestAPI } from './api/RestAPI'
import './App.css'
import JobPosting, {JobPostingProps} from './components/JobPosting'

const theme = createTheme();

function App() {
  const [dataHasLoaded, setDataHasLoaded] = useState(false);
  const [jobPostings, setJobPostings] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDataHasLoaded(false);
    let newJob = new FormData();
    newJob.append('title', title);
    newJob.append('description', description);
    RestAPI.createJobPosting(newJob);
    getJobs();
  }

  useEffect(() => {
    getJobs();
  }, []);

  const getJobs = () => {
    RestAPI.getJobPostings().then((res) => {
      let jobs: any = [];
      res.data.forEach((job: JobPostingProps, index: number) => {
        jobs.push(<JobPosting 
          key={index}
          title={job.title}
          description={job.description}
        />);
      });
      setJobPostings(jobs);
      setDataHasLoaded(true);
    }).catch((err) => {
      console.log(err.response);
    });
  };

  const renderContent = () => {
    if(dataHasLoaded) {
      return <Stack gap={2} width={'100%'}>{jobPostings}</Stack>;
    } else {
      return <CircularProgress />;
    }
  };

  const handleTitleChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLTextAreaElement;
    setTitle(target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLTextAreaElement;
    setDescription(target.value)
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
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

            <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
              <Stack gap={2} width={'100%'}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                  onChange={(e) => handleTitleChange(e)}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                  multiline={true}
                  onChange={(e) => handleDescriptionChange(e)}
                  rows={6}
                />
                <LoadingButton 
                  type="submit"
                  fullWidth
                  variant="contained"
                >
                  Create Job
                </LoadingButton>
              </Stack>
            </Box>
          </Box>
        </Grid>

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
      </Grid>
    </ThemeProvider>
  )
}

export default App
