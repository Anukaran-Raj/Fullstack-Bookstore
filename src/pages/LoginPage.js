import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config'

const LoginForm = ({ onLogin }) => {
  const navigate = useNavigate();

  // Formik setup for form state management and validation
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Please enter your username'),
      password: Yup.string().required('Please enter your password'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      console.log("Submitting login form:", values); // Debugging log

      try {
        // Sending login request to the backend API
        const response = await fetch(`${API_BASE_URL}/auth/login`, { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });

        console.log("Response Status:", response.status); // Debugging log
        const data = await response.json();
        console.log("Response Data:", data); // Debugging log

        if (response.ok) {
          // Call parent function after successful login
          if (onLogin) onLogin(data);

          // Navigate to home page
          alert("login succesfull")
          navigate('/');
        } else {
          // Set form error if login failed
          setErrors({ password: data.message || 'Invalid username or password' });
        }
      } catch (error) {
        console.error('Login error:', error);
        alert(`Error: ${error.message || 'Something went wrong. Please try again.'}`);
      }

      setSubmitting(false);
    },
  });

  return (
    <div id="form-container">
      <div className="form-content">
        <h2 id="form-header">Login</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-grid">
            <div>
              <label>Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                className={formik.touched.username && formik.errors.username ? 'input-error' : ''}
              />
              {formik.touched.username && formik.errors.username && (
                <div className="error-message">{formik.errors.username}</div>
              )}
            </div>

            <div>
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className={formik.touched.password && formik.errors.password ? 'input-error' : ''}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="error-message">{formik.errors.password}</div>
              )}
            </div>
          </div>

          <button type="submit" className="submit-button" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? 'Logging in...' : 'Login'}
          </button>

          <div className="or-divider">Or</div>
          
          <p>Don't have an account?  
            <Link to="/Register"> Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;