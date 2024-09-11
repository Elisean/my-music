'use client'

import Link from 'next/link'
import React from 'react'
import Title from '../UI/Title/Title'
import { TrackList } from '../TrackList/TrackList'

export const Aside:React.FC = () => {
  return (
    <aside className=' w-1/5 mr-8 min-h-full'>
      <div className='flex flex-col justify-between min-h-20'>
        <div>
          <Link href='/pages/home'>Home</Link>
        </div>

        <div>
          <Link href='/pages/home'>Search</Link>
        </div>

        <div>
          <Link href='/pages/home'>Your Library</Link>
        </div>
      </div>


        <div className='flex flex-col items-start my-7'>
            <button className='mb-2'>Create Playlist</button>
            <Link href='/pages/likedSongs'>Liked songs</Link>  
        </div>

        <Title>Playlist</Title>
        <TrackList>
              <li className='pl-4'>aaaaa aaaaa aaaaaaaaaaaaaaaaaaaaaaaaa</li>
              <li>ssssss</li>
              <li>uuuuuu</li>
              <li>uuuuuu</li>
              <li>uuuuuu</li>
              <li>uuuuuu</li>
              <li>uuuuuu</li>
              <li>uuuuuu</li>
              <li>uuuuuu</li>
              <li>uuuuuu</li>
              <li>uuuuuu</li>
              <li>uuuuuu</li>
              <li>uuuuuu</li>
              <li>uuuuuu</li>
              <li>uuuuuu</li>
              <li>uuuuuu</li>
              <li>uuuuuu</li>
              <li>uuuuuu</li>
              <li>uuuuuu</li>
              <li>uuuuuu</li>
              <li>uuuuuu</li>
              <li>uuuuuu</li>
              <li>uuuuuu</li>
              <li>uuuuuu</li>
              <li>uuuuuu</li>
              <li>uuuuuu</li>
              <li>uuuuuu</li>
        </TrackList>
   


    </aside>
  )
}

