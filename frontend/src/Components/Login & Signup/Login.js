import React from 'react'
import Meta from './Meta'
import Container from './Container'
import CustomInput from './CustomInput'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const user = {
      username: username,
      password: password
    };

    try {
      const { data } = await axios.post(
        'http://localhost:8000/token/',
        user,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );
      // console.log(data);

      // Store tokens in localStorage
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      sessionStorage.setItem('mId', data.mId);
      console.log(data.mId);

      // Set Authorization header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;

      // Redirect to desired page after successful login
      window.location.href = '/home';
    } catch (error) {

      console.error("Login error:", error);
      setErrorMessage('登入失敗，請重新輸入帳號密碼。');
      console.log(errorMessage);

      // Handle login error
    }
  };

  return (
    <Container className="login-wrapper py-5 home-wrapper-2">
      <div className="row">
        <div className="col-12">
          <div className="auth-card">
            <h3 className="text text-center mb-3 pb-4">登入</h3>
            <form className="d-flex flex-column gap-15" onSubmit={submit}>
              <div className="mb-3">
                <input className="form-control" placeholder="Username" name='username' type='text' value={username} required onChange={e => setUsername(e.target.value)} />
              </div>
              <div className="mb-3">
                <input name='password' type="password" className="form-control" placeholder="Password" value={password} required onChange={e => setPassword(e.target.value)} />
                <p style={{ color: "red", fontSize: "13px", marginBottom: "5px" }}>{errorMessage}</p>
              </div>
              <div>
                <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                  <button type="submit" className="button signup border-dark">login</button>
                  <Link to="/signup" className="button signup border-dark">signup</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Login