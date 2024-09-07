import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import "./LoginPage.css";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../../api/getToken";
import { Button } from "../../ui/Button/Button";

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "Минимум 2 буквы")
    .max(10, "Максимум 10 букв")
    .required("Обязательное поле"),
});
const LoginPage = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null)

  const onErrorGetToken = (statusCode) => {
    if (statusCode === 401) {
      setErrorMessage('Логин или пароль некорректные')
    } else if (errorMessage === 500) {
      setErrorMessage('Внутренняя ошибка сервера')
    } else {
      setErrorMessage('Упс. Что-то пошло не так')
    }
  }

  return (
    <div>
      <h1>Войти</h1>
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
            onSuccess: () => navigate('/'),
            onError: onErrorGetToken,
          });
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="email" />
            <Field name="password" type="password" />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <Button variant="primary" type="submit">Войти</Button>
          </Form>
        )}
      </Formik>
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
};
export default LoginPage;
