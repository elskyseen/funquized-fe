import { Formik, Form } from "formik";
import Button from "../components/Button";
import CardCenterIcon from "../components/Card/CardCenterIcon";
import Input from "../components/Input";
import AuthLayout from "../layouts/AuthLayout";
import userIcon from "../assets/user_icon.svg";
import lockIcon from "../assets/lock_icon.svg";
import registerIcon from "../assets/register_icon.svg";
import pencilIcon from "../assets/pencil_icon.svg";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../configs/axios";
import { IRegister } from "../interfaces";
import { registerSchema } from "../validations";
import Spiner from "../components/Spiner";

const initialValue: IRegister = {
  username: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [isRegisterError, setIsRegisterError] = useState<string>("");
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
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
                username: value.username,
              },
            });
          }}
        >
          {({ values, errors, touched }) => (
            <Form>
              <Input
                type="text"
                name="username"
                placeholder="username"
                value={values.username}
                icon={userIcon}
                isError={
                  errors.username && touched.username ? errors.username : ""
                }
              />
              <Input
                type="password"
                name="password"
                icon={pencilIcon}
                placeholder="password"
                value={values.password}
                isError={
                  errors.password && touched.password ? errors.password : ""
                }
              />
              <Input
                type="password"
                name="confirmPassword"
                icon={lockIcon}
                placeholder="confirm password"
                value={values.confirmPassword}
                isError={
                  errors.confirmPassword && touched.confirmPassword
                    ? errors.confirmPassword
                    : ""
                }
              />
              <Button
                type="submit"
                text={isPending ? <Spiner /> : "register"}
              />
              <div className="flex">
                <Link
                  to={"/login"}
                  className="bg-white text-primary w-full text-center py-2 capitalize border-2 border-primary rounded font-extrabold mb-3 relative"
                >
                  Login
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </CardCenterIcon>
    </AuthLayout>
  );
};

export default Register;
