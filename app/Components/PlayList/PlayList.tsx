import React from 'react'

interface IPlayList {
    children: React.ReactNode
}


export const PlayList:React.FC<IPlayList> = ({children}) => {
  return (
    <div className='w-1/4 text-center border rounded-sm border-slate-500 mx-4 mt-4'>
      {children}
    </div>
  )
}


