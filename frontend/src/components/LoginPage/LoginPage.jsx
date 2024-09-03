import { Formik, Form, Field, } from "formik";
import "./LoginPage.css";
import * as Yup from "yup";

const LoginPage = () => {
  const SignupSchema = Yup.object().shape({
    password: Yup.string()
      .min(2, "Минимум 2 буквы")
      .max(10, "Максимум 10 букв")
      .required("Обязательное поле"),
    email: Yup.string().email("Неверный email").required("Обязательное поле"),
  });
  return (
    <div>
      <h1>Войти</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          console.log(values); // отправка формы на бэк
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="email" />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
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
