import React from 'react'
import { IInput } from '../../../types'


export const Input:React.FC <IInput> = ({onChange, type, placeholder, error, id, label, className}) =>{
  
  return (
      <label className='flex flex-col' htmlFor={label}>
          {label}
           <input placeholder={placeholder} type={type} id={id} className={error ? 'text-red-500' : `${className}`} onChange={onChange}/>   
        {
            error && (
                <div className='text-red-500'>{error}</div>
            )
        }
      </label>
  )
}