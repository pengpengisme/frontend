import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from './Container';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Fetch the CSRF token from the server
    axios.get('http://localhost:8000/csrf-token/').then((response) => {
      const csrfToken = response.data.csrfToken;

      localStorage.setItem('csrfToken', csrfToken);
      // Include the CSRF token in the request headers
      axios.defaults.headers.post['X-CSRFToken'] = csrfToken;
    });
  }, []); // Empty dependency array means this effect runs only once after initial render

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      username: username,
      password: password,
      email: email,
    };

    try {
      const csrfToken = localStorage.getItem('csrfToken')

      await axios.post(
        'http://127.0.0.1:8000/register/',
        user,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
          },
          credentials: 'include',
        }
      )

      // Handle successful signup (e.g., show a success message)
    } catch (error) {
      console.error('Signup error:', error);
      // Handle signup error
    }
  };

  return (
    <Container className="signup-wrapper py-5 home-wrapper-2">
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up</h3>
            <div className="form-group mt-3">
              <label>Username</label>
              <input
                className="form-control mt-1"
                placeholder="Enter Username"
                name="username"
                type="text"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Email</label>
              <input
                className="form-control mt-1"
                placeholder="Enter Email"
                name="email"
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                name="password"
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="button signup border-dark">
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default Signup;
