import React from "react"

interface ICardCenterIcon {
  children?: any,
  icon: string,
  title? : string
}

const CardCenterIcon : React.FC<ICardCenterIcon> = ({ children,icon,title = "FunQuized" }) => {
  return (
    <div className='px-28 py-20 flex flex-col justify-center items-center rounded-2xl border-8 border-primary bg-white relative'>
      <img src={icon} alt="icon" className="absolute mx-auto left-0 right-0 -translate-y-[328px]"/>
      <h1 className='text-5xl font-extrabold text-primary text-center mb-16'>{title}</h1>
      {children}
    </div>
  )
}

export default CardCenterIcon