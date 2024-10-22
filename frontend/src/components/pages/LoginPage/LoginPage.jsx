import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import { getToken } from "../../../api/getToken";
import { Button } from "../../ui/Button/Button";
import imgForLoginPage from "../../../images/imgForLoginPage.jpeg";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import classes from "./LoginPage.module.css";

export const LoginPage = () => {
  const { t } = useTranslation();

  const SignupSchema = Yup.object().shape({
    password: Yup.string()
      .min(2, t("minSymbol_few", { count: 2 }))
      .max(10, t("maxSymbol_many", { count: 10 }))
      .required(t("requiredField")),
  });

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const onErrorGetToken = (statusCode) => {
    if (statusCode === 401) {
      setErrorMessage(t("error401Login"));
      toast(t("error401Login"));
    } else if (statusCode === 500) {
      setErrorMessage(t("error500"));
      toast(t("error500"));
    } else {
      setErrorMessage(t("smthError"));
      toast(t("smthError"));
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <div className={classes.loginForm}>
          <div className={classes.picture}>
            <img
              src={imgForLoginPage}
              alt="человечек с красным флагом на горе"
            />
          </div>
          <div className={classes.login}>
            <h1 className={classes.text}>{t("enter")}</h1>
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
                  <Field name="email" />
                  <Field
                    name="password"
                    type="password"
                    className={classes.password}
                  />
                  {errors.password && touched.password ? (
                    <div>{errors.password}</div>
                  ) : null}
                  <Button variant="primary" type="submit">
                    {t("enter")}
                  </Button>
                </Form>
              )}
            </Formik>
            {errorMessage && <div>{errorMessage}</div>}
          </div>
        </div>
        <div className={classes.signup}>
          {t("notAccount")} <NavLink to="/signup">{t("signup")}</NavLink>
        </div>
      </div>
    </div>
  );
};
