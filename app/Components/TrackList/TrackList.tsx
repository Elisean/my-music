import React from 'react'

interface ITrackList {
    children: React.ReactNode,
}


export const TrackList:React.FC<ITrackList> = ({children}) => {
  return (
    <ul className='border rounded-sm border-slate-500 overflow-x-hidden overflow-y-auto whitespace-nowrap max-h-96'>
            {children}
    </ul>
  )
}





