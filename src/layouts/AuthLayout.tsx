const AuthLayout = ({children}:any) => {
  return (
    <div className='w-full min-h-screen bg-gradient-to-b from-[#F9F3E9] to-primary flex justify-center items-center'>
    {children}
  </div>
  )
}

export default AuthLayout