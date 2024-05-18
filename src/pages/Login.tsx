import CardCenterIcon from "../components/Card/CardCenterIcon"
import AuthLayout from "../layouts/AuthLayout"
import loginIcon from "../assets/login_icon.svg"
import userIcon from "../assets/user_icon.svg"
import lockIcon from "../assets/lock_icon.svg"
import googleIcon from "../assets/google_icon.svg"
import Input from "../components/Input"
import { Link } from "react-router-dom"
import Button from "../components/Button"

const Login = () => {
  return (
    <AuthLayout>
      <CardCenterIcon icon={loginIcon}>
        <Input type="text" icon={userIcon} placeholder="username"/>
        <Input type="email" icon={lockIcon} placeholder="email" />
        <Link to="/login" className="text-xl text-primary mb-4">Forgot Password?</Link>
        <Button text="login"/>
        <Button isPrimary={false} text="register" link="/register"/>
        <h1 className="text-xl text-primary mb-4 capitalize">login using alternate</h1>
        <Button icon={googleIcon} isPrimary={false} text="login using google" />
      </CardCenterIcon>
    </AuthLayout>
  )
}

export default Login