import * as Yup from "yup";
import { ILogin, IRegister } from "./interfaces";

const loginSchema = Yup.object<ILogin>({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

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

export { loginSchema, registerSchema };
