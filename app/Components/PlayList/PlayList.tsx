import React from 'react'

interface IPlayList {
    children: React.ReactNode
    onClick?: any;
}


export const PlayList:React.FC<IPlayList> = ({children, onClick}) => {
  return (
    <div className='w-1/4 text-center border rounded-sm border-slate-500 mx-4 mt-4 xxs:w-full xxs:text-left xxs:mx-0 xxs:p-2' onClick={onClick}>
      {children}
    </div>
  )
}


