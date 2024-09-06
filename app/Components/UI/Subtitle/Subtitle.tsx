import React from 'react'

interface ISubtitle {
    children: React.ReactNode,
}



const Subtitle:React.FC<ISubtitle> = ({children}) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default Subtitle
