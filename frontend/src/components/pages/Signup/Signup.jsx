import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/Button/Button";
import imgForSignupPage from "../../../images/imgForSignupPage.jpg";
import { useSendUserMutation } from "../../../api/signupUserApi";

import classes from "./Signup.module.css";

const SignupSchema = Yup.object().shape({
  userName: Yup.string()
    .min(3, "Минимум 3 символа")
    .max(20, "Максимум 20 символов")
    .required("Обязательное поле"),
  password: Yup.string()
    .min(6, "Минимум 6 символов")
    .required("Обязательное поле"),
  retypePassword: Yup.string()
    .required("Обязательное поле")
    .oneOf([Yup.ref("password")], "Ваши пароли не совпадают"),
});

export const Signup = () => {
  const [sendUser] = useSendUserMutation();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const onErrorPostUser = (statusCode) => {
    if (statusCode === 401) {
      setErrorMessage("Пользователя с таким логином уже существует");
    } else if (errorMessage === 500) {
      setErrorMessage("Внутренняя ошибка сервера");
    } else {
      setErrorMessage("Упс. Что-то пошло не так");
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <div className={classes.picture}>
          <img src={imgForSignupPage} alt="img for signup page" />
        </div>
        <div className={classes.signup}>
          <h1 className={classes.text}>Регистрация</h1>
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
                  Зарегистрироваться
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
