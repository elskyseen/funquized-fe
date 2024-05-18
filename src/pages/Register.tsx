import Button from "../components/Button"
import CardCenterIcon from "../components/Card/CardCenterIcon"
import Input from "../components/Input"
import AuthLayout from "../layouts/AuthLayout"

import userIcon from "../assets/user_icon.svg"
import lockIcon from "../assets/lock_icon.svg"
import registerIcon from "../assets/register_icon.svg"
import pencilIcon from "../assets/pencil_icon.svg"
import envelopIcon from "../assets/envelope_icon.svg"

const Register = () => {
  return (
    <AuthLayout>
      <CardCenterIcon icon={registerIcon}>
        <Input type="text" icon={userIcon} placeholder="username"/>
        <Input type="email" icon={envelopIcon} placeholder="email" />
        <Input type="password" icon={pencilIcon} placeholder="password" />
        <Input type="password" icon={lockIcon} placeholder="confirm password" />
        <Button text="register"/>
        <Button isPrimary={false} text="login" link="/login" />
      </CardCenterIcon>
    </AuthLayout>
  )
}

export default Register