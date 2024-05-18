import React from 'react'
import { useNavigate } from 'react-router-dom'

interface IButton {
  icon? : string,
  isPrimary?: boolean,
  text: string,
  link? : string
}

const Button: React.FC<IButton> = ({ icon, isPrimary = true, text,link = "" }) => {
  const navigate = useNavigate();
  const handleNavigate = (link: string): void => {
    navigate(link)
  }

  return (
    <button className={(isPrimary ? 'bg-primary text-white' : 'bg-white text-primary') + ' w-full py-2 capitalize border-2 border-primary rounded font-extrabold mb-3 relative'}
    onClick={()=>handleNavigate(link)}>
      {icon && <img src={icon} alt="icon" className='absolute top-1 left-1'/>}
      <p>{text}</p>
    </button>
  )
}

export default Button