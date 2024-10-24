import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import { getToken } from "../../../api/getToken";
import { Button } from "../../ui/Button/Button";
import imgForLoginPage from "../../../images/imgForLoginPage.jpeg";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import FormTextField from "../../ui/FormTextField/FormTextField";

import classes from "./LoginPage.module.css";

export const LoginPage = () => {
  const { t } = useTranslation();

  const SignupSchema = Yup.object().shape({
    password: Yup.string()
      .min(2, t("minSymbol_few", { count: 2 }))
      .max(10, t("maxSymbol_many", { count: 10 }))
      .required(t("Обязательное поле")),
  });

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const onErrorGetToken = (statusCode) => {
    if (statusCode === 401) {
      setErrorMessage(t("Логин или пароль некорректные"));
    } else if (statusCode === 500) {
      setErrorMessage(t("Внутренняя ошибка сервера"));
    } else {
      setErrorMessage(t("Упс. Что-то пошло не так"));
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <div className={classes.loginForm}>
          <div className={classes.picture}>
            <img
              src={imgForLoginPage}
              alt={t("Человечек с красным флагом на горе")}
              className={classes.picture}
            />
          </div>
          <div className={classes.login}>
            <h1 className={classes.text}>{t("Войти")}</h1>
            <Formik
              initialValues={{
                email: "",
                password: "",
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
                  <FormTextField
                    name="email"
                    type="text"
                    placeholder={t("Ваш ник")}
                  />
                  <FormTextField
                    name="password"
                    type="password"
                    placeholder={t("Пароль")}
                  />
                  {/* {errors.password && touched.password ? (
                    <div>{errors.password}</div>
                  ) : null} */}
                  <Button 
                  variant="primary" 
                  type="submit"
                  className={classes.button}
                  >
                    {t("Войти")}
                  </Button>
                </Form>
              )}
            </Formik>
            {errorMessage && <div>{errorMessage}</div>}
          </div>
        </div>
        <div className={classes.signup}>
          {t("Нет аккаунта?")}{" "}
          <NavLink to="/signup">{t("Регистрация")}</NavLink>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
