import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/Button/Button";
import imgForSignupPage from "../../../images/imgForSignupPage.jpg";
import { useSendUserMutation } from "../../../api/signupUserApi";
import { useTranslation } from "react-i18next";

import classes from "./Signup.module.css";

export const Signup = () => {
  const { t } = useTranslation();
  
  const SignupSchema = Yup.object().shape({
    userName: Yup.string()
      .min(3, t("minSymbol_few",{count: 3}))
      .max(20, t("maxSymbol_many",{count: 20}))
      .required(t("requiredField")),
    password: Yup.string()
      .min(6, t("minSymbol_many",{count: 6}))
      .required(t("requiredField")),
    retypePassword: Yup.string()
      .required(t("requiredField"))
      .oneOf([Yup.ref("password")], t("passwordDontToch")),
  });

  const [sendUser] = useSendUserMutation();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const onErrorPostUser = (statusCode) => {
    if (statusCode === 401) {
      setErrorMessage(t("error401Signup"));
    } else if (errorMessage === 500) {
      setErrorMessage(t("error500"));
    } else {
      setErrorMessage(t("smthError"));
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <div className={classes.picture}>
          <img src={imgForSignupPage} alt="img for signup page" />
        </div>
        <div className={classes.signup}>
          <h1 className={classes.text}>{t("signup")}</h1>
          <Formik
            initialValues={{
              userName: "",
              password: "",
              retypePassword: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
              sendUser({ userName: values.userName, password: values.password })
                .unwrap() // распаковывает промис от RTK Query, чтобы можно было использовать then/catch
                .then((response) => {
                  navigate("/");
                  // console.log('response', response);
                  // localStorage.setItem("token", response.token);
                })
                .catch((error) => {
                  onErrorPostUser(error?.status);
                });
            }}
          >
            {({ errors, touched }) => (
              <Form className={classes.form}>
                <Field name="userName" />
                {errors.userName && touched.userName ? (
                  <div>{errors.userName}</div>
                ) : null}
                <Field
                  name="password"
                  type="password"
                  className={classes.password}
                />
                {errors.password && touched.password ? (
                  <div>{errors.password}</div>
                ) : null}
                <Field
                  name="retypePassword"
                  type="password"
                  className={classes.password}
                />
                {errors.retypePassword && touched.retypePassword ? (
                  <div>{errors.retypePassword}</div>
                ) : null}
                <Button variant="primary" type="submit">
                  {t("buttonSignup")}
                </Button>
              </Form>
            )}
          </Formik>
          {errorMessage && <div>{errorMessage}</div>}
        </div>
      </div>
    </div>
  );
};
