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
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../configs/axios";
import { useState } from "react";
import { useAppDispatch } from "../hooks/hooks";
import { setToken } from "../counter/tokenCounter";
import { setCookie } from "../utils/setCookie";
import { ILogin } from "../interfaces";
import { loginSchema } from "../validations";
import { BASE_URL } from "../variable";

const initialValue: ILogin = {
  email: "",
  password: "",
};

const Login = () => {
  const [isLoginError, setIsLoginError] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { mutate } = useMutation({
    mutationFn: async (value: ILogin) => {
      return await axiosInstance
        .post("/login", value)
        .then(({ data }) => {
          setCookie(data.accessToken);
          dispatch(setToken(data.accessToken));
          navigate("/");
        })
        .catch((error) => {
          setIsLoginError(error.response.data.message);
        });
    },
  });

  const loginUsingGoogle = async () => {
    window.location.href = `${BASE_URL}/auth/google`;
  };

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
          {({ errors, values, touched }) => (
            <Form>
              <Input
                type="email"
                name="email"
                icon={userIcon}
                placeholder="email"
                value={values.email}
                isError={errors.email && touched.email ? errors.email : ""}
              />
              <Input
                type="password"
                name="password"
                icon={lockIcon}
                placeholder="password"
                value={values.password}
                isError={
                  errors.password && touched.password ? errors.password : ""
                }
              />
              <Button type="submit" text="login" />
              <div className="flex">
                <Link
                  to={"/register"}
                  className="bg-white text-primary w-full text-center py-2 capitalize border-2 border-primary rounded font-extrabold mb-3 relative"
                >
                  Register
                </Link>
              </div>
              <h1 className="text-xl text-primary text-center mb-4 capitalize">
                login using alternate
              </h1>
              <Button
                type="button"
                icon={googleIcon}
                isPrimary={false}
                text="login using google"
                onClick={loginUsingGoogle}
              />
            </Form>
          )}
        </Formik>
      </CardCenterIcon>
    </AuthLayout>
  );
};

export default Login;
