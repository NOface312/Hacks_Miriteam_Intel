import axios from 'axios'

const Repair_Services = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/repair/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});

Repair_Services.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config;

        // test for token presence, no point in sending a request if token isn't present
        if (localStorage.getItem('refresh_token') && error.response.status === 401 && error.response.statusText === "Unauthorized") {
            const refresh_token = localStorage.getItem('refresh_token');

            return Repair_Services
                .post('/token/refresh/', { refresh: refresh_token })
                .then((response) => {

                    localStorage.setItem('access_token', response.data.access);
                    localStorage.setItem('refresh_token', response.data.refresh);

                    Repair_Services.defaults.headers['Authorization'] = "JWT " + response.data.access;
                    originalRequest.headers['Authorization'] = "JWT " + response.data.access;

                    return Repair_Services(originalRequest);
                })
                .catch(err => {
                    console.log(err)
                });
        }
        // specific error handling done elsewhere
        return Promise.reject({ ...error });
    }
);

export default Repair_Services