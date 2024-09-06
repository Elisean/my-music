import React from 'react'

interface ITitle{
    children: React.ReactNode;
    className?: string;
}

const Title:React.FC<ITitle> = ({children, className}) => {
  return (
    <h1 className={className}>
        {children}
    </h1>
  )
}

export default Title
