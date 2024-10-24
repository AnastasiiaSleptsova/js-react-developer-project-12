import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/Button/Button";
import imgForSignupPage from "../../../images/imgForSignupPage.jpg";
import { useSendUserMutation } from "../../../api/signupUserApi";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import FormTextField from "../../ui/FormTextField/FormTextField";

import classes from "./Signup.module.css";

export const Signup = () => {
  const { t } = useTranslation();

  const SignupSchema = Yup.object().shape({
    userName: Yup.string()
      .min(3, t("minSymbol_few", { count: 3 }))
      .max(20, t("maxSymbol_many", { count: 20 }))
      .required(t("Обязательное поле")),
    password: Yup.string()
      .min(6, t("minSymbol_many", { count: 6 }))
      .required(t("Обязательное поле")),
    retypePassword: Yup.string()
      .required(t("Обязательное поле"))
      .oneOf([Yup.ref("password")], t("Ваши пароли не совпадают")),
  });

  const [sendUser] = useSendUserMutation();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const onErrorPostUser = (statusCode) => {
    if (statusCode === 401) {
      setErrorMessage(t("Пользователя с таким логином уже существует"));
    } else if (errorMessage === 500) {
      setErrorMessage(t("Внутренняя ошибка сервера"));
    } else {
      setErrorMessage(t("Упс. Что-то пошло не так"));
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <div className={classes.picture}>
          <img src={imgForSignupPage} alt={t("Человечек рад")}/>
        </div>
        <div className={classes.signup}>
          <h1 className={classes.text}>{t("Регистрация")}</h1>
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
                  // TODO сделать с Олегом логику с получением токинов из респонса
                })
                .catch((error) => {
                  onErrorPostUser(error?.status);
                });
            }}
          >
            {() => (
              <Form className={classes.form}>
                <FormTextField
                  name="userName"
                  type="text"
                  placeholder={t("Имя пользователя")}
                />
                <FormTextField
                  name="password"
                  type="password"
                  placeholder={t("Пароль")}
                />
                <FormTextField
                  name="retypePassword"
                  type="password"
                  placeholder={t("Подтвердите пароль")}
                />
                <Button 
                variant="primary" 
                type="submit"
                className={classes.button}
                >
                  {t("Зарегестрироваться")}
                </Button>
              </Form>
            )}
          </Formik>
          {errorMessage && <div>{errorMessage}</div>}
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};


  /* {errors.userName && touched.userName ? (
                  <div>{errors.userName}</div>
                ) : null} */


  /* <Field
                  name="password"
                  type="password"
                  placeholder={t("Пароль")}
                  className={classes.password}
                /> */

