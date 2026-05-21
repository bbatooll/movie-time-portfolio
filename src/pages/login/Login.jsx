import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { LANGUAGES } from "../../Constants";
import InputField from "../../components/InputField";

const Login = () => {
  const [lang, setLang] = useState("en");
  const [errorMsg, setErrorMsg] = useState("");
  const t = LANGUAGES[lang];
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userEmail")) {
      navigate("/movies");
    }
  }, [navigate]);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email(t.errors.email).required(t.errors.required),
      password: Yup.string().required(t.errors.required),
    }),
    onSubmit: (values) => {
      setErrorMsg("");
      const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
      const user = users.find(
        (u) => u.email === values.email && u.password === values.password,
      );

      if (user) {
        localStorage.setItem("userEmail", user.email);
        navigate("/movies");
      } else {
        setErrorMsg(
          lang === "en"
            ? "Invalid email or password."
            : "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
        );
      }
    },
  });

  return (
    <div className="container" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="auth-card">
        <button
          type="button"
          className="btn-lang-toggle"
          onClick={() => setLang(lang === "en" ? "ar" : "en")}
        >
          {lang === "en" ? "العربية" : "English"}
        </button>
        <form className="auth-form" onSubmit={formik.handleSubmit}>
          <h2>{t.loginTitle}</h2>
          {errorMsg && <p className="error-message">{errorMsg}</p>}
          <InputField
            label={t.email}
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.email}
            touched={formik.touched.email}
          />
          <InputField
            label={t.password}
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.password}
            touched={formik.touched.password}
          />
          <button type="submit" className="btn-auth">
            {t.loginBtn}
          </button>
          <p className="auth-footer-text">
            {t.noAccount} <Link to="/register">{t.createAccount}</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
