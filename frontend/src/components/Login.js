import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = ({ handleLogin, isLoading }) => {
  //use state object for email and password
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  //handle input change
  const handleChange = e => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };

  //handle submit
  const handleSubmit = e => {
    e.preventDefault();
    const { email, password } = data;
    handleLogin({ email, password });
  };

  return (
    <div className="auth-form">
      <h2 className="auth-form__title">Log in</h2>
      <form className="auth-form__form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          className="auth-form__input"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          className="auth-form__input"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
        />

        <div className="auth-form__footer">
          <div className="auth-form__footer-wrapper">
            <button type="submit" className="auth-form__submit-button">
              {isLoading ? 'Logging In...' : 'Log in'}
            </button>
            <p className="auth-form__footer-text">
              Not a member yet?{' '}
              <Link to="/signup" className="auth-form__footer-link">
                Sign up here!
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
