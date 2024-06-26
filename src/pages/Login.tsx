import CardCenterIcon from "../components/Card/CardCenterIcon";
import AuthLayout from "../layouts/AuthLayout";
import loginIcon from "../assets/login_icon.svg";
import userIcon from "../assets/user_icon.svg";
import lockIcon from "../assets/lock_icon.svg";
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
import Spiner from "../components/Spiner";

const initialValue: ILogin = {
  username: "",
  password: "",
};

const Login = () => {
  const [isLoginError, setIsLoginError] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { mutate, isPending } = useMutation({
    mutationFn: async (value: ILogin) => {
      return await axiosInstance
        .post("/login", value)
        .then(({ data }) => {
          setCookie(data.accessToken);
          dispatch(setToken(data.accessToken));
          document.cookie = "isLogin=true;path=/";
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
          {({ errors, values, touched }) => (
            <Form>
              <Input
                type="text"
                name="username"
                icon={userIcon}
                placeholder="username"
                value={values.username}
                isError={
                  errors.username && touched.username ? errors.username : ""
                }
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
              <Button type="submit" text={isPending ? <Spiner /> : "login"} />
              <div className="flex">
                <Link
                  to={"/register"}
                  className="bg-white text-primary w-full text-center py-2 capitalize border-2 border-primary rounded font-extrabold mb-3 relative"
                >
                  Register
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </CardCenterIcon>
    </AuthLayout>
  );
};

export default Login;
