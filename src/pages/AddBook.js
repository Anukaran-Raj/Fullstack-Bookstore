import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import './AddBook.css';

const AddBookForm = () => {
  const token = localStorage.getItem("token");

  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      price: "",
      imageUrl: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      author: Yup.string().required("Author is required"),
      price: Yup.number()
        .required("Price is required")
        .positive("Price must be greater than zero"),
      imageUrl: Yup.string().url("Invalid URL"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await fetch("http://localhost:5221/api/books", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          alert("Book added successfully");
          resetForm();
        } else {
          const data = await response.json();
          alert(data.message || "Failed to add book");
        }
      } catch (error) {
        console.error("Error adding book:", error);
        alert("An error occurred. Please try again.");
      }

      setSubmitting(false);
    },
  });

  return (
    <div className="form-container">
      <div className="form-content">
        <h2 id="form-header">Add Book</h2>
        <form onSubmit={formik.handleSubmit}>
          {/* Title */}
          <div>
            <label>Title</label>
            <input
              type="text"
              name="title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              className={formik.touched.title && formik.errors.title ? 'input-error' : ''}
            />
            {formik.touched.title && formik.errors.title && (
              <div className="error-message">{formik.errors.title}</div>
            )}
          </div>

          {/* Author */}
          <div>
            <label>Author</label>
            <input
              type="text"
              name="author"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.author}
              className={formik.touched.author && formik.errors.author ? 'input-error' : ''}
            />
            {formik.touched.author && formik.errors.author && (
              <div className="error-message">{formik.errors.author}</div>
            )}
          </div>

          {/* Price */}
          <div>
            <label>Price ($)</label>
            <input
              type="number"
              name="price"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
              className={formik.touched.price && formik.errors.price ? 'input-error' : ''}
            />
            {formik.touched.price && formik.errors.price && (
              <div className="error-message">{formik.errors.price}</div>
            )}
          </div>

          {/* Image URL */}
          <div>
            <label>Image URL</label>
            <input
              type="text"
              name="imageUrl"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.imageUrl}
              className={formik.touched.imageUrl && formik.errors.imageUrl ? 'input-error' : ''}
            />
            {formik.touched.imageUrl && formik.errors.imageUrl && (
              <div className="error-message">{formik.errors.imageUrl}</div>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={formik.isSubmitting} className="submit-button">
            {formik.isSubmitting ? "Adding..." : "Add Book"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBookForm;
