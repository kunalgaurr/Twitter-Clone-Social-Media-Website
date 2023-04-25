import { useFormik } from 'formik';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSchema } from '../../Schema/loginSchema';
import './Login.css';
import { loginUser } from '../../Redux/authReducer';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const email = useRef();
  const password = useRef();

  const onSubmit = async (values, actions) => {
    const user = {
      email: email.current.value,
      password: password.current.value,
    };
    dispatch(loginUser(email.current.value, password.current.value));
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
    console.log(user);
    if (user !== null) {
      navigate('/');
    } else if (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    errors,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit,
  });
  return (
    <div id="login-container">
      <span id="login-header">Log into your twitter account!</span>
      <form action="" id="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="login-input"
          placeholder="Enter you email"
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
          className="login-input"
          placeholder="Enter you password"
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
        <button
          disabled={isSubmitting || loading}
          id="login-button"
          type="submit"
        >
          Log in
        </button>
      </form>
      <p id="login-text">New here?</p>
      <button
        id="register-button"
        onClick={() => {
          navigate('/register');
        }}
      >
        Sign up
      </button>
    </div>
  );
};
