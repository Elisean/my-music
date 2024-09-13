'use client'

import Link from 'next/link'
import React, { useEffect, useRef } from 'react';
import Title from '../UI/Title/Title'
import { TrackList } from '../TrackList/TrackList'
import { Input } from '../UI/Input/Input'
import { useDispatch, useSelector } from 'react-redux';
import { fetchMusicList, setCurrentTrackIndex, setIsPlaying } from '@/app/Store/Slices/musicListSlice';
import { RootState, AppDispatch } from '@/app/Store/store';

export const Aside:React.FC = () => {

  const [isOpenSearch, setIsOpenSearch] = React.useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const musicList = useSelector((state: RootState) => state.music.musicList);
  const status = useSelector((state: RootState) => state.music.status);
  const currentTrackIndex = useSelector((state: RootState) => state.music.currentTrackIndex);
  const activeTrackIndex = useSelector((state: RootState) => state.music.activeTrackIndex);

  const trackListRef = useRef<any>(null);

  const getTrackNameFromUrl = (url: string) => {
    if (url) {
      const path = new URL(url).pathname;
      const parts = path.split('/');
      const fileName = decodeURIComponent(parts[parts.length - 1]);
      return fileName.replace(/%20/g, ' ');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (trackListRef.current && !trackListRef.current.contains(event.target)) {
        setIsOpenSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [trackListRef]);

  useEffect(() => {
 
    if (status === 'idle') {
      dispatch(fetchMusicList());
    }
  }, [status, dispatch]);

  const handleTrackClick = (index: number) => {
    dispatch(setCurrentTrackIndex(index));
    dispatch(setIsPlaying(true)); // Устанавливаем состояние воспроизведения в true при выборе трека
  };
  return (
    <aside className='
      w-1/5 
      mr-8 
      min-h-full 
      xxs:w-0 
      xxs:outline-none
      xxs:mr-0
      '>
        
      <div className='
        flex 
        flex-col 
        justify-around  
        xxs:absolute
        xxs:flex-row
        xxs:bottom-0
        xxs:w-full
        xxs:text-xs
        xxs:py-4
        xxs:bg-slate-700
        xxs:text-slate-400
        '>
          
        <div className='
          xxs:flex
          xxs:flex-col
          xxs:items-center  
          '>
          <div>
            <svg width="16" height="16" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M29 29C29 29.5523 28.5523 30 28 30H20.2778C19.7255 30 19.2778 29.5523 19.2778 29V21.0526C19.2778 20.5003 18.8301 20.0526 18.2778 20.0526H14.7222C14.1699 20.0526 13.7222 20.5003 13.7222 21.0526V29C13.7222 29.5523 13.2745 30 12.7222 30H5C4.44772 30 4 29.5523 4 29V9.89769C4 9.54272 4.18817 9.21436 4.49443 9.0349L15.9962 2.29524C16.3075 2.11283 16.6929 2.11225 17.0047 2.29373L28.503 8.98543C28.8107 9.16451 29 9.49369 29 9.84972V29Z" fill="currentColor"/>
            </svg>
          </div>
          <Link href='/pages/home'>Home</Link>
        </div>


        <div  className='
          xxs:flex
          xxs:flex-col
          xxs:items-center
          ' 
          onClick={() => setIsOpenSearch(!isOpenSearch)}>
          <div>
            <svg width="16" height="16" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.7747 20.3561L27.5924 26.4934C28.1511 27.0828 28.1332 28.0268 27.5524 28.5933C26.9808 29.1511 26.078 29.1329 25.5282 28.5526L19.7061 22.4083C17.7272 23.93 15.4956 24.7673 13.0114 24.9203C11.3514 25.0226 9.74381 24.792 8.18858 24.2288C6.63335 23.6655 5.2766 22.8625 4.11833 21.8199C2.96006 20.7772 2.01249 19.5057 1.27561 18.0055C0.538736 16.5053 0.120961 14.9125 0.0222852 13.2271C-0.0763905 11.5418 0.152625 9.90916 0.709331 8.32924C1.26604 6.74932 2.05852 5.37069 3.08678 4.19334C4.11504 3.01599 5.36839 2.05225 6.84685 1.30212C8.3253 0.551984 9.89446 0.125799 11.5543 0.02356C13.2142 -0.0786793 14.8218 0.151834 16.3771 0.715101C17.9324 1.27837 19.2892 2.08134 20.4474 3.12402C21.6055 4.16669 22.5531 5.43815 23.2901 6.93838C24.027 8.43862 24.4448 10.0314 24.5434 11.7168C24.606 12.7861 24.5356 13.8403 24.3321 14.8793C24.1287 15.9184 23.8096 16.8946 23.3747 17.8079C22.9399 18.7212 22.4066 19.5706 21.7747 20.3561ZM12.84 21.9912C14.1107 21.9129 15.3094 21.5854 16.436 21.0085C17.5626 20.4317 18.519 19.6933 19.305 18.7934C20.091 17.8934 20.6986 16.8412 21.1279 15.6365C21.5572 14.4319 21.7341 13.1845 21.6586 11.8944C21.5831 10.6042 21.262 9.38751 20.6953 8.24424C20.1286 7.10096 19.4026 6.13081 18.5173 5.33378C17.632 4.53674 16.5964 3.92105 15.4106 3.48669C14.2247 3.05232 12.9965 2.87428 11.7258 2.95255C10.4551 3.03081 9.25646 3.35835 8.12981 3.93514C7.00317 4.51194 6.04682 5.25035 5.26078 6.15038C4.47473 7.0504 3.86709 8.10268 3.43783 9.30721C3.00858 10.5117 2.83171 11.7591 2.90721 13.0494C2.98272 14.3396 3.3038 15.5563 3.87045 16.6995C4.4371 17.8427 5.16312 18.8128 6.04853 19.6099C6.93394 20.407 7.96951 21.0227 9.15524 21.457C10.341 21.8913 11.5692 22.0694 12.84 21.9912Z" fill="currentColor"/>
            </svg>
          </div>
          <button > Search </button>
         
        </div>
       

       {
        isOpenSearch && (
          <div className='flex pt-4 flex-col items-center w-full h-screen fixed top-0 left-0 bg-black bg-opacity-50'>
            <Input type="text" placeholder="Поиск" className='w-72 px-4 py-3 text-sm text-black rounded-lg' />
         
            <Title>Playlist</Title>
          
            {musicList.length === 0 ? (
                  <p className='text-white text-sm'>Wait! Music loading</p>
                ) : (
                  <TrackList className='w-72 border rounded-sm border-slate-500 overflow-x-hidden overflow-y-auto whitespace-nowrap max-h-96 bg-black'>
                      <div ref={trackListRef}>
                      {musicList.map((url, index) => (
                          <div
                            key={index}
                            onClick={() => handleTrackClick(index)}
                            style={{
                              backgroundColor: index === activeTrackIndex ? 'lightblue' : 'transparent',
                              color: index === activeTrackIndex ? 'black' : 'white',
                              fontWeight: index === activeTrackIndex ? 'bold' : '',
                              cursor: 'pointer',
                              padding: '8px',
                              borderRadius: '4px',
                            }}
                          >
                            {getTrackNameFromUrl(url)}
                          </div>
                        ))}
                      </div>
                  </TrackList>
                )}
          </div>
        )
        }
       
        <div className='
          xxs:flex
          xxs:flex-col
          xxs:items-center
          '>
    
          <div>
            <svg width="16" height="16" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="3" height="26" rx="1.5" fill="currentColor"/>
            <rect x="11" y="3" width="3" height="26" rx="1.5" fill="currentColor"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M21.5 6.67524V26.5191H26.5V9.76681L21.5 6.67524ZM20.5288 3.1517C19.8627 2.73984 19 3.21512 19 3.99394V28.0076C19 28.5557 19.4477 29 20 29H28C28.5523 29 29 28.5557 29 28.0076V8.94045C29 8.59781 28.8219 8.2794 28.5288 8.09821L20.5288 3.1517Z" fill="currentColor"/>
            </svg>

          </div>

          <Link href='/pages/home'>Library</Link>
        
        </div>
      </div>


        <div className='flex flex-col items-start my-7 xxs:hidden'>
            <button className='mb-2'>Create Playlist</button>
            <Link href='/pages/likedSongs'>Liked songs</Link>  
        </div>

    </aside>
  )
}

