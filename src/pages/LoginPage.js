import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import API_BASE_URL from "../config";

const LoginForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  // ✅ Formik setup for form state management and validation
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please enter your username"),
      password: Yup.string().required("Please enter your password"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (response.ok && data.token) {
          // ✅ Store token in local storage
          localStorage.setItem("token", data.token);
          console.log("Token saved:", localStorage.getItem("token"));

          try {
            // ✅ Decode token and set user context
            const decodedToken = jwtDecode(data.token);
            console.log("Decoded token:", decodedToken);

            // ✅ Use correct JWT claim keys for username and role
            const username =
              decodedToken[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
              ] || decodedToken.sub;
            const role =
              decodedToken[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
              ] || decodedToken.role;

            setUser({ username, role });

            // ✅ Redirect based on user role
            if (role === "buyer") {
              navigate("/");
            } else if (role === "seller") {
              navigate("/");
            } else {
              navigate("/");
            }
          } catch (decodeError) {
            console.error("Error decoding token:", decodeError);
            alert("Invalid token. Please log in again.");
          }
        } else {
          setErrors({
            password: data.message || "Invalid username or password",
          });
        }
      } catch (error) {
        console.error("Login error:", error);
        alert(`Error: ${error.message || "Something went wrong. Please try again."}`);
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
            {/* Username Field */}
            <div>
              <label>Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                className={
                  formik.touched.username && formik.errors.username
                    ? "input-error"
                    : ""
                }
              />
              {formik.touched.username && formik.errors.username && (
                <div className="error-message">
                  {formik.errors.username}
                </div>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className={
                  formik.touched.password && formik.errors.password
                    ? "input-error"
                    : ""
                }
              />
              {formik.touched.password && formik.errors.password && (
                <div className="error-message">
                  {formik.errors.password}
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="submit-button"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Logging in..." : "Login"}
          </button>

          <div className="or-divider">Or</div>

          {/* Signup Link */}
          <p>
            Don't have an account?
            <Link to="/Register"> Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
