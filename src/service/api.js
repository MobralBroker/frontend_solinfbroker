import axios from 'axios';

// const crudApi = axios.create({ baseURL: 'https://cqidt9eivj.loclx.io' });
const authenticationApi = axios.create({ baseURL: 'http://localhost:8080' });
const crudApi = axios.create({ baseURL: 'http://localhost:8081' });

export { authenticationApi, crudApi };