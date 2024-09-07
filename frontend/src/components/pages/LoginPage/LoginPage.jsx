import React from "react";
import { Formik, Form, Field } from "formik";
import "./LoginPage.css";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../../api/getToken";

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "Минимум 2 буквы")
    .max(10, "Максимум 10 букв")
    .required("Обязательное поле"),
});

const LoginPage = () => {
  const navigate = useNavigate();

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
            navigate,
          });
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="email" />
            <Field name="password" />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <button type="submit">Войти</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default LoginPage;
