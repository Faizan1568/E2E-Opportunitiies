const axios = require('axios');

const API_URL = 'http://localhost:5000/api/auth';

async function testAuth() {
  try {
    console.log('--- Testing Admin Login ---');
    try {
      const adminLogin = await axios.post(`${API_URL}/login`, {
        email: 'admin@e2e.com',
        password: 'password123',
        role: 'admin'
      });
      console.log('Admin Login Success:', !!adminLogin.data.token);
      console.log('Admin Data:', adminLogin.data.user);
    } catch (err) {
      console.error('Admin Login Failed:', err.response ? err.response.data : err.message);
    }

    console.log('\n--- Testing User Signup ---');
    const testUser = {
      email: `test_user_${Date.now()}@example.com`,
      password: 'userpass123',
      category: 'Student',
      role: 'student'
    };
    
    try {
      const signup = await axios.post(`${API_URL}/signup`, testUser);
      console.log('User Signup Success:', signup.data.success);
    } catch (err) {
      console.error('User Signup Failed:', err.response ? err.response.data : err.message);
    }

    console.log('\n--- Testing User Login ---');
    try {
      const userLogin = await axios.post(`${API_URL}/login`, {
        email: testUser.email,
        password: testUser.password,
        role: 'student'
      });
      console.log('User Login Success:', !!userLogin.data.token);
      console.log('User Data:', userLogin.data.user);
    } catch (err) {
      console.error('User Login Failed:', err.response ? err.response.data : err.message);
    }

  } catch (err) {
    console.error('Test script error:', err.message);
  }
}

testAuth();
