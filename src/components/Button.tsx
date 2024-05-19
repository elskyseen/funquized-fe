import React from 'react'

interface IButton {
  icon? : string,
  isPrimary?: boolean,
  text: string,
  type? : "submit"|"button"
}

const Button: React.FC<IButton> = ({ icon, isPrimary = true, text,type}) => {
  return (
    <button type={type} className={(isPrimary ? 'bg-primary text-white' : 'bg-white text-primary') + ' w-full py-2 capitalize border-2 border-primary rounded font-extrabold mb-3 relative'}>
      {icon && <img src={icon} alt="icon" className='absolute top-1 left-1'/>}
      <p>{text}</p>
    </button>
  )
}

export default Button