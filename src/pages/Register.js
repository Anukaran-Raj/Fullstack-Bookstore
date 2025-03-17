import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Register.css';
import { FiAlertCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [userType, setUserType] = useState("seller");
    //const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            address: "",
            userType: "seller",
        },
        validationSchema: Yup.object({
            username: Yup.string().min(3, "Too short!").required("Please fill out this field"),
            email: Yup.string().email("Invalid email address").required("Please fill out this field"),
            password: Yup.string().min(6, "Must be at least 6 characters").required("Please fill out this field"),
            userType: Yup.string().required("User type is required"),
            address: Yup.string().nullable().when("userType", {
                is: "buyer",
                then: (schema) => schema.required("Please provide an address"),
                otherwise: (schema) => schema.notRequired().nullable(),
            }),
        }),
        onSubmit: async (values) => {
            try {
                const response = await fetch("http://localhost:5000/api/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                });

                if (!response.ok) {
                    throw new Error("Registration failed!");
                }
                alert("Registration Successful!");
                // navigate("/login");
            } catch (error) {
                alert(error.message);
            }
        },
    });

    return (
        <div id="form-container">
            <div className="form-content">
                <div id="form-header">Register</div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-grid">
                        <div>
                            <label>Username</label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Enter username"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.username}
                                className={formik.touched.username && formik.errors.username ? 'input-error' : ''}
                            />
                            {formik.touched.username && formik.errors.username && (
                                <div className="error-message">
                                    <FiAlertCircle className="error-icon" /> {formik.errors.username}
                                </div>
                            )}
                        </div>

                        <div>
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <div className="error-message">
                                    <FiAlertCircle className="error-icon" /> {formik.errors.email}
                                </div>
                            )}
                        </div>

                        <div>
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <div className="error-message">
                                    <FiAlertCircle className="error-icon" /> {formik.errors.password}
                                </div>
                            )}
                        </div>

                        <div className="radio-group">
                            <label>User Type</label>
                            <div className="radio-options">
                                <label>
                                    <input
                                        type="radio"
                                        name="userType"
                                        value="buyer"
                                        checked={formik.values.userType === "buyer"}
                                        onChange={(e) => {
                                            formik.handleChange(e);
                                            setUserType(e.target.value);
                                            formik.setFieldValue("address", "");
                                        }}
                                    />
                                    Buyer
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="userType"
                                        value="seller"
                                        checked={formik.values.userType === "seller"}
                                        onChange={(e) => {
                                            formik.handleChange(e);
                                            setUserType(e.target.value);
                                        }}
                                    />
                                    Seller
                                </label>
                            </div>
                        </div>

                        {userType === "buyer" && (
                            <div>
                                <label>Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Enter address"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.address}
                                />
                                {formik.touched.address && formik.errors.address && (
                                    <div className="error-message">
                                        <FiAlertCircle className="error-icon" /> {formik.errors.address}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <button type="submit" className="submit-button">
                        Register
                    </button>

                    <div className="or-divider">Or</div>

                    <p>Already have an account? 
                        {/* <a href="/login">Login</a> */}
                        </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
