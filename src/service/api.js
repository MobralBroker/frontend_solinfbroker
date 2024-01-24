import axios from 'axios';

// const crudApi = axios.create({ baseURL: 'https://cqidt9eivj.loclx.io' });
// const authenticationApi = axios.create({ baseURL: 'http://localhost:8080' });
// const crudApi = axios.create({ baseURL: 'http://localhost:8081' });

const authenticationApi = axios.create({ baseURL: process.env.REACT_APP_AUTH_API_URL });
const crudApi = axios.create({ baseURL: process.env.REACT_APP_CRUD_API_URL });


export { authenticationApi, crudApi };
