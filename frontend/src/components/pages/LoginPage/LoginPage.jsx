import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import { getToken } from "../../../api/getToken";
import { Button } from "../../ui/Button/Button";
import imgForLoginPage from "../../../images/imgForLoginPage.jpeg";

import classes from "./LoginPage.module.css";

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "Минимум 2 буквы")
    .max(10, "Максимум 10 букв")
    .required("Обязательное поле"),
});

export const LoginPage = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const onErrorGetToken = (statusCode) => {
    if (statusCode === 401) {
      setErrorMessage("Логин или пароль некорректные");
    } else if (errorMessage === 500) {
      setErrorMessage("Внутренняя ошибка сервера");
    } else {
      setErrorMessage("Упс. Что-то пошло не так");
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <div className={classes.loginForm}>
          <div className={classes.picture}>
            <img src={imgForLoginPage} alt="img for login page" />
          </div>
          <div className={classes.login}>
            <h1 className={classes.text}>Войти</h1>
            <Formik
              initialValues={{
                email: "admin",
                password: "admin",
              }}
              validationSchema={SignupSchema}
              onSubmit={(values) => {
                getToken({
                  username: values.email,
                  password: values.password,
                  onSuccess: () => navigate("/"),
                  onError: onErrorGetToken,
                });
              }}
            >
              {({ errors, touched }) => (
                <Form className={classes.form}>
                  <Field name="email" />
                  <Field name="password" type="password" className={classes.password}/>
                  {errors.password && touched.password ? (
                    <div>{errors.password}</div>
                  ) : null}
                  <Button variant="primary" type="submit">
                    Войти
                  </Button>
                </Form>
              )}
            </Formik>
            {errorMessage && <div>{errorMessage}</div>}
          </div>
        </div>
        <div className={classes.signup}>
          Нет аккаунта? <NavLink to="/signup" >Регистрация</NavLink>
        </div>
      </div>
    </div>
  );
};
