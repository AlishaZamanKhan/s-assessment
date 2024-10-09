import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './userForm.css';

const UserForm = ({ onSubmit, initialValues, onClose }) => {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().min(2).max(50).required(),
    lastName: Yup.string().min(2).max(50).required(),
    gender: Yup.string().required(),
    dateOfBirth: Yup.date().required(),
    city: Yup.string(),
    phone: Yup.string().required(),
    email: Yup.string().email().required(),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
        onClose();
      }}
    >
      {() => (
        <Form className="user-form">
          <div className="form-field">
            <Field name="firstName" className="input-field" placeholder="First Name" />
            <ErrorMessage name="firstName" component="div" className="error-message" />
          </div>
          
          <div className="form-field">
            <Field name="lastName" className="input-field" placeholder="Last Name" />
            <ErrorMessage name="lastName" component="div" className="error-message" />
          </div>
          
          <div className="form-field">
            <Field as="select" name="gender" className="input-field">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Field>
            <ErrorMessage name="gender" component="div" className="error-message" />
          </div>
          
          <div className="form-field">
            <Field type="date" name="dateOfBirth" className="input-field" />
            <ErrorMessage name="dateOfBirth" component="div" className="error-message" />
          </div>

          <div className="form-field">
            <Field type="city" name="city" placeholder="Your City" className="input-field" />
          </div>
          
          <div className="form-field">
            <Field name="phone" className="input-field" placeholder="Phone" />
            <ErrorMessage name="phone" component="div" className="error-message" />
          </div>
          
          <div className="form-field">
            <Field name="email" className="input-field" placeholder="Email" />
            <ErrorMessage name="email" component="div" className="error-message" />
          </div>
          
          <button type="submit" className="submit-button">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
