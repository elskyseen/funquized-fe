import React from 'react'
import { useNavigate } from 'react-router-dom'

interface IButton {
  icon? : string,
  isPrimary?: boolean,
  text: string,
  link?: string,
  handleClick? : any
}

const Button: React.FC<IButton> = ({ icon, isPrimary = true, text,link = "", handleClick}) => {
  const navigate = useNavigate();

  const isButtonClicked = (link: string): void => {
    if (link !== "") {
      navigate(link)
    } else { 
      handleClick();
    }
  }

  return (
    <button className={(isPrimary ? 'bg-primary text-white' : 'bg-white text-primary') + ' w-full py-2 capitalize border-2 border-primary rounded font-extrabold mb-3 relative'}
    onClick={()=>isButtonClicked(link)}>
      {icon && <img src={icon} alt="icon" className='absolute top-1 left-1'/>}
      <p>{text}</p>
    </button>
  )
}

export default Button