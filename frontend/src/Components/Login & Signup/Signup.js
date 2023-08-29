import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from './Container';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mail, setEmail] = useState('');
  const [csrfToken, setCsrfToken] = useState('');


  useEffect(() => {
      var csrftoken = document.cookie
      .split('; ')
      .find(row => row.startsWith('csrftoken='))
      .split('=')[1];

      axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
      
      setCsrfToken(csrftoken)
      console.log(csrftoken)
  }, []); // Empty dependency array means this effect runs only once after initial render

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: username,
      password: password,
      email: mail,
      csrfmiddlewaretoken: csrfToken
    };

    try {

      const { data } = await axios.post(
        'http://127.0.0.1:8000/register/',
        user,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );
      window.location.href = '/login';
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
                value={mail}
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
