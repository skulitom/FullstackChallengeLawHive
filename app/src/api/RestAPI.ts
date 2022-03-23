import axios from 'axios'

const DEFAULT_HEADERS = {'Content-Type': 'application/json'};

export const RestAPI = {
    createJobPosting: async function (formData: FormData) {
        return await axios.post('http://localhost:4000/jobs/createJob' ,
            formData,
            {headers: DEFAULT_HEADERS});
    },
    payForJob: async function (formData: FormData) {
        return await axios.post('http://localhost:4000/jobs/payForJob' ,
            formData,
            {headers: DEFAULT_HEADERS});
    },
    getJobPostings: async function () {
        return await axios.get('http://localhost:4000/jobs/getAll');
    }
}