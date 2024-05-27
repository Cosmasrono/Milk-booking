import axios from 'axios';

const instance = axios.create({
  baseURL: '', // Replace this with your API base URL
});

export default instance;