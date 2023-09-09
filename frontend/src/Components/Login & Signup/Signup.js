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
    <Container className="login-wrapper py-5 home-wrapper-2">
      <div className="row">
        <div className='col-12'>
          <div className='auth-card'>
            <h3 className="text text-center mb-3 pb-4">註冊</h3>
            <form className="d-flex flex-column gap-15" onSubmit={handleSubmit}>
              <div className="mb-3">
                <input className="form-control" placeholder="Username" name="username" type="text" value={username} required onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="mb-3">
                <input className="form-control" placeholder="Email" name="email" type="email" value={mail} required onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="mb-3">
                <input name="password" type="password" className="form-control" placeholder="Password" value={password} required onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div>
                <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                  <button type="submit" className="button border-dark">signup</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Signup;
