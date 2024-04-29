// // auth.ts
// import axios from 'axios';
// import { useRouter } from 'next/router';

// interface LoginData {
//   email: string;
//   password: string;
// }

// export const login = async (loginData: LoginData) => {
//   const router = useRouter(); // Access the router instance

//   try {
//     const response = await axios.post('/api/Auth/login', loginData);
//     const { token } = response.data;

//     // Store the token in localStorage
//     localStorage.setItem('token', token);

//     // Navigate to the home page
//     router.push('/Homepage');

//     return token;
//   } catch (error) {
//     console.error('Login error:', error);
//     throw error;
//   }
// };