import React from 'react'

interface IInput {
  icon: string,
  type: string,
  placeholder : string
}

const Input : React.FC<IInput> = ({icon,type,placeholder}) => {
  return (
    <div className="flex mb-4">
      <img src={icon} alt="icon" className='bg-primary p-1 rounded-l'/>
      <input type={type} placeholder={placeholder} className='w-full p-2 border-2 border-primary rounded-r text-primary placeholder:text-primary outline-none'/>
    </div>
  )
}

export default Input