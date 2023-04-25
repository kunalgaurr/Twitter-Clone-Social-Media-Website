import React, { useRef } from 'react';
import './Register.css';
import { useFormik } from 'formik';
import { registerSchema } from '../../Schema/registerSchema';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const name = useRef();
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    const user = {
      name: name.current.value,
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
    };
    await axios.post('/user/register', user);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
    navigate('/login');
  };

  const {
    values,
    handleBlur,
    touched,
    handleChange,
    handleSubmit,
    errors,
    isSubmitting,
  } = useFormik({
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registerSchema,
    onSubmit,
  });
  return (
    <div id="register-container">
      <span id="register-heading">
        Sign up to <span>Twitter!</span>
      </span>
      <form onSubmit={handleSubmit} autoComplete="off">
        <input
          type="text"
          className={
            (errors.name && touched.name ? 'input-error' : '') +
            ' ' +
            'register-input'
          }
          placeholder="Enter your name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          name="name"
          ref={name}
        />
        {errors.name && touched.name ? (
          <span className="error">{errors.name}</span>
        ) : (
          ''
        )}
        <input
          type="text"
          className={
            (errors.username && touched.username ? 'input-error' : '') +
            ' ' +
            'register-input'
          }
          placeholder="Create a username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          name="username"
          ref={username}
        />
        {errors.username && touched.username ? (
          <span className="error">{errors.username}</span>
        ) : (
          ''
        )}

        <input
          type="email"
          className={
            (errors.email && touched.email ? 'input-error' : '') +
            ' ' +
            'register-input'
          }
          placeholder="Enter your email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          name="email"
          ref={email}
        />
        {errors.email && touched.email ? (
          <span className="error">{errors.email}</span>
        ) : (
          ''
        )}
        <input
          type="password"
          className={
            (errors.password && touched.password ? 'input-error' : '') +
            ' ' +
            'register-input'
          }
          placeholder="Create a password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          name="password"
          ref={password}
        />
        {errors.password && touched.password ? (
          <span className="error">{errors.password}</span>
        ) : (
          ''
        )}
        <input
          type="password"
          className={
            (errors.confirmPassword && touched.confirmPassword
              ? 'input-error'
              : '') +
            ' ' +
            'register-input'
          }
          placeholder="Confirm your password"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          name="confirmPassword"
        />
        {errors.confirmPassword && touched.confirmPassword ? (
          <span className="error">{errors.confirmPassword}</span>
        ) : (
          ''
        )}
        <button disabled={isSubmitting} id="register-button" type="submit">
          Sign up
        </button>
      </form>
      <p id="register-text">Already a user?</p>
      <button
        id="login-button"
        onClick={() => {
          navigate('/login');
        }}
      >
        Log in
      </button>
    </div>
  );
};
