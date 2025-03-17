import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './LoginForm.css';
//import { Link, useNavigate } from 'react-router-dom';
import { FiAlertCircle } from 'react-icons/fi'; // Import error icon

const LoginForm = ({ onLogin }) => {
  //const navigate = useNavigate();
  const hardcodedEmail = 'test@gmail.com';
  const hardcodedPassword = '123';

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Please fill out this field'),
      password: Yup.string().required('Please fill out this field'),
    }),
    onSubmit: (values) => {
      if (values.email === hardcodedEmail && values.password === hardcodedPassword) {
        //onLogin();
        alert("Succesfull login")
        //navigate('/About');
      } else {
        alert('Invalid email or password');
      }
    },
  });

  return (
    <div id="form-container">
      <div className="form-content">
        {/* Login Heading Inside the Card */}
        <div id="form-header">Login</div>

        <form onSubmit={formik.handleSubmit}>
          <div className="form-grid">
            {/* Email Input */}
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={formik.touched.email && formik.errors.email ? 'input-error' : ''}
                required
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error-message">
                  <FiAlertCircle className="error-icon" />
                  {formik.errors.email}
                </div>
              ) : null}
            </div>

            {/* Password Input */}
            <div>
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className={formik.touched.password && formik.errors.password ? 'input-error' : ''}
                required
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error-message">
                  <FiAlertCircle className="error-icon" />
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-button">
            Login
          </button>

          <div className="or-divider">Or</div>

          <p>
            Don't have an account? 
            {/* <Link to="/signup">Sign Up</Link> */}
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
