import axios from 'axios';

const apiClient = axios.create({
  // Esta es la URL de tu servidor de Laravel
  baseURL: 'http://127.0.0.1:8080',
  withCredentials: true, // Importante para la autenticación futura (Sanctum)
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export default apiClient;
