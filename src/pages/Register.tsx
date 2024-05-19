import * as Yup from "yup";
import { Formik, Form } from "formik";

import Button from "../components/Button";
import CardCenterIcon from "../components/Card/CardCenterIcon";
import Input from "../components/Input";
import AuthLayout from "../layouts/AuthLayout";

import userIcon from "../assets/user_icon.svg";
import lockIcon from "../assets/lock_icon.svg";
import registerIcon from "../assets/register_icon.svg";
import pencilIcon from "../assets/pencil_icon.svg";
import envelopIcon from "../assets/envelope_icon.svg";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../configs/axios";

interface IRegister {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const registerSchema = Yup.object<IRegister>({
  username: Yup.string()
    .min(5, "Username must be greater than 5 character")
    .max(12)
    .required(),
  email: Yup.string().email("Wrong email, please type valid email").required(),
  password: Yup.string().min(8).required(),
  confirmPassword: Yup.string()
    .min(8)
    .required("confirm password is required field"),
});

const initialValue: IRegister = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [isRegisterError, setIsRegisterError] = useState<string>("");
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: async (newUser: IRegister) => {
      return await axiosInstance
        .post("/users", newUser)
        .then(() => {
          navigate("/login");
        })
        .catch((error) => {
          setIsRegisterError(error.response.data.message);
        });
    },
  });

  return (
    <AuthLayout>
      <CardCenterIcon icon={registerIcon} isError={isRegisterError}>
        <Formik
          initialValues={initialValue}
          validationSchema={registerSchema}
          onSubmit={(value, { resetForm }) => {
            mutate(value);
            resetForm({
              values: {
                password: "",
                confirmPassword: "",
                email: value.email,
                username: value.username,
              },
            });
          }}
        >
          {({ values, errors }) => (
            <Form>
              <Input
                type="text"
                name="username"
                placeholder="username"
                value={values.username}
                icon={userIcon}
                isError={errors.username}
              />
              <Input
                type="email"
                name="email"
                icon={envelopIcon}
                value={values.email}
                placeholder="email"
                isError={errors.email}
              />
              <Input
                type="password"
                name="password"
                icon={pencilIcon}
                placeholder="password"
                value={values.password}
                isError={errors.password}
              />
              <Input
                type="password"
                name="confirmPassword"
                icon={lockIcon}
                placeholder="confirm password"
                value={values.confirmPassword}
                isError={errors.confirmPassword}
              />
              <Button type="submit" text="register" />
              <Button type="button" isPrimary={false} text="login" />
            </Form>
          )}
        </Formik>
      </CardCenterIcon>
    </AuthLayout>
  );
};

export default Register;
