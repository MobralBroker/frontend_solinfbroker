import axios from 'axios';

// const crudApi = axios.create({ baseURL: 'https://cqidt9eivj.loclx.io' });
// const authenticationApi = axios.create({ baseURL: 'http://localhost:8080/auth' });
// const crudApi = axios.create({ baseURL: 'http://localhost:8081' });


const authenticationApi = axios.create({ baseURL: process.env.VUE_APP_AUTH_API_URL });
const crudApi = axios.create({ baseURL: process.env.VUE_APP_CRUD_API_URL });
const crudEnvioDados = process.env.VUE_APP_ENVIO_DADOS;

// const authenticationApi = axios.create({ baseURL: "http://ec2-18-219-1-90.us-east-2.compute.amazonaws.com:8081/auth/" });
// const crudApi = axios.create({ baseURL: "http://ec2-18-219-1-90.us-east-2.compute.amazonaws.com:8081/api/" });

export { authenticationApi, crudApi, crudEnvioDados };
