import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config';
import './Register.css';

const Register = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            role: 'buyer',
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(3, 'Username must be at least 3 characters')
                .required('Please enter your username'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Please enter your password'),
        }),
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            console.log('Submitting registration form:', values); // Debugging log

            try {
                const response = await fetch(`${API_BASE_URL}/auth/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(values),
                });

                console.log('Response Status:', response.status); // Debugging log
                const data = await response.json();
                console.log('Response Data:', data); // Debugging log

                if (response.ok) {
                    alert('Registration Successful!');
                    navigate('/login');
                } else {
                    setErrors({ password: data.message || 'Registration failed' });
                }
            } catch (error) {
                console.error('Registration error:', error);
                alert(`Error: ${error.message || 'Something went wrong. Please try again.'}`);
            }

            setSubmitting(false);
        },
    });

    return (
        <div id="form-container">
            <div className="form-content">
                <h2 id="form-header">Register</h2>
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

                        <div className="role-group">
                            <label>Select Your Role:</label>
                            <div className="role-options">
                                <label>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="buyer"
                                        checked={formik.values.role === 'buyer'}
                                        onChange={formik.handleChange}
                                    />
                                    Buyer
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="seller"
                                        checked={formik.values.role === 'seller'}
                                        onChange={formik.handleChange}
                                    />
                                    Seller
                                </label>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="submit-button" disabled={formik.isSubmitting}>
                        {formik.isSubmitting ? 'Registering...' : 'Register'}
                    </button>

                    <div className="or-divider">Or</div>

                    <p>
                        Already have an account?
                        <Link to="/login"> Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
