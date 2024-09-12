import React from 'react'

interface ITrackList {
    children: React.ReactNode,
    className: string
    ref?: React.RefObject<HTMLUListElement>
}


export const TrackList:React.FC<ITrackList> = ({children, className, ref}) => {
  return (
    <ul ref={ref} className={className}>
            {children}
    </ul>
  )
}





