import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import InputField from "../components/InputField";
import { LANGUAGES } from "../Constants";

const Register = () => {
  const [lang] = useState("en");
  const t = LANGUAGES[lang];
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userEmail")) {
      navigate("/movies");
    }
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      age: "",
      country: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(3, t.errors.fullName)
        .required(t.errors.required),
      email: Yup.string()
        .email(t.errors.invalidEmail)
        .required(t.errors.required),
      age: Yup.number()
        .positive()
        .min(18, "Must be at least 18")
        .required(t.errors.required),
      country: Yup.string().required(t.errors.required),
      password: Yup.string()
        .min(8, "At least 8 characters")
        .matches(/[a-z]/, "Lowercase required")
        .matches(/[A-Z]/, "Uppercase required")
        .matches(/[0-9]/, "Number required")
        .required(t.errors.required),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], t.errors.passMatch)
        .required(t.errors.required),
    }),
    onSubmit: (values) => {
      const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
      const isExist = users.find((u) => u.email === values.email);

      if (isExist) {
        alert("This email is already registered!");
        return;
      }

      users.push(values);
      localStorage.setItem("registeredUsers", JSON.stringify(users));
      localStorage.setItem("userEmail", values.email);
      navigate("/movies");
    },
  });

  return (
    <div className="container" dir={lang === "ar" ? "rtl" : "ltr"}>
      <form className="form" onSubmit={formik.handleSubmit}>
        <h2>{t.register}</h2>
        <InputField
          label={t.fullName}
          name="fullName"
          onChange={formik.handleChange}
          value={formik.values.fullName}
          error={formik.errors.fullName}
          touched={formik.touched.fullName}
        />
        <InputField
          label={t.email}
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
          touched={formik.touched.email}
        />
        <InputField
          label={t.age}
          type="number"
          name="age"
          onChange={formik.handleChange}
          value={formik.values.age}
          error={formik.errors.age}
          touched={formik.touched.age}
        />

        <div className="input-group">
          <label className="input-label">{t.country}</label>
          <select
            name="country"
            className={`input-field ${formik.errors.country && formik.touched.country ? "input-error" : ""}`}
            value={formik.values.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">
              {lang === "en" ? "Select Country" : "اختر الدولة"}
            </option>
            <option value="Jordan">Jordan</option>
            <option value="Palestine">Palestine</option>
            <option value="Egypt">Egypt</option>
            <option value="Lebanon">Lebanon</option>
          </select>
          {formik.errors.country && formik.touched.country && (
            <span className="error-text">{formik.errors.country}</span>
          )}
        </div>

        <InputField
          label={t.password}
          type="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.errors.password}
          touched={formik.touched.password}
        />
        <InputField
          label={t.confirmPassword}
          type="password"
          name="confirmPassword"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          error={formik.errors.confirmPassword}
          touched={formik.touched.confirmPassword}
        />

        <button type="submit" className="btn-primary">
          {t.btn}
        </button>

        <p className="auth-footer-text">
          {t.loginLink} <Link to="/">{t.login}</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
