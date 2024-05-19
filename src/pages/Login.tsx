import CardCenterIcon from "../components/Card/CardCenterIcon";
import AuthLayout from "../layouts/AuthLayout";
import loginIcon from "../assets/login_icon.svg";
import userIcon from "../assets/user_icon.svg";
import lockIcon from "../assets/lock_icon.svg";
import googleIcon from "../assets/google_icon.svg";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../configs/axios";
import { useState } from "react";

interface ILogin {
  email: string;
  password: string;
}

const loginSchema = Yup.object<ILogin>({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

const initialValue: ILogin = {
  email: "",
  password: "",
};

const Login = () => {
  const [isLoginError, setIsLoginError] = useState<string>("");
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: async (value: ILogin) => {
      return await axiosInstance
        .post("/login", value)
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          setIsLoginError(error.response.data.message);
        });
    },
  });

  return (
    <AuthLayout>
      <CardCenterIcon icon={loginIcon} isError={isLoginError}>
        <Formik
          initialValues={initialValue}
          validationSchema={loginSchema}
          onSubmit={(value, { resetForm }) => {
            mutate(value);
            resetForm();
          }}
        >
          {({ errors, values }) => (
            <Form>
              <Input
                type="email"
                name="email"
                icon={userIcon}
                placeholder="email"
                value={values.email}
                isError={errors.email}
              />
              <Input
                type="password"
                name="password"
                icon={lockIcon}
                placeholder="password"
                value={values.password}
                isError={errors.password}
              />
              {/* <Link to="" className="text-xl text-primary mb-4">
              Forgot Password?
            </Link> */}
              <Button type="submit" text="login" />
              <Button type="button" isPrimary={false} text="register" />
              <h1 className="text-xl text-primary text-center mb-4 capitalize">
                login using alternate
              </h1>
              <Button
                type="button"
                icon={googleIcon}
                isPrimary={false}
                text="login using google"
              />
            </Form>
          )}
        </Formik>
      </CardCenterIcon>
    </AuthLayout>
  );
};

export default Login;
