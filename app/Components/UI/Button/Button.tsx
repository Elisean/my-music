'use client'

import React from 'react'

interface iButton {
    children: React.ReactNode,
    onClick?:() => void;
    className?:string,
    id?: string,
    type?: "button" | "submit" | "reset";
}


export const Button:React.FC<iButton> = ({children, className, id, type, onClick}) => {
  return (
    <button className={className} id={id} type={type} onClick={onClick}>
        {children}
    </button>
  )
}


