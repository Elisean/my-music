'use client'
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMusicList,
  setCurrentTrackIndex,
  setIsPlaying,
  setCurrentTime,
  setDuration,
  setVolume,
} from '@/app/Store/Slices/musicListSlice';
import { RootState, AppDispatch } from '@/app/Store/store';

interface IPlayer {
  currentTrack?: string | null;
}

export const Player:React.FC<IPlayer> = () => {

  const [isColor, setIsColor] = React.useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const musicList = useSelector((state: RootState) => state.music.musicList);
  const status = useSelector((state: RootState) => state.music.status);
  const currentTrackIndex = useSelector((state: RootState) => state.music.currentTrackIndex);
  const isPlaying = useSelector((state: RootState) => state.music.isPlaying);
  const currentTime = useSelector((state: RootState) => state.music.currentTime);
  const duration = useSelector((state: RootState) => state.music.duration);
  const volume = useSelector((state: RootState) => state.music.volume);

  const audioRef = useRef<any>(null);
  const [userInteracted, setUserInteracted] = React.useState(false);
  const [playPromise, setPlayPromise] = React.useState<Promise<void> | null>(null);

  const handleNextTrack = () => {
    dispatch(setCurrentTrackIndex((currentTrackIndex + 1) % musicList.length));
    dispatch(setIsPlaying(true));
  };

  const handlePreviousTrack = () => {
    dispatch(setCurrentTrackIndex((currentTrackIndex - 1 + musicList.length) % musicList.length));
    dispatch(setIsPlaying(true));
  };

  const getTrackNameFromUrl = (url: string) => {
    if (url) {
      const path = new URL(url).pathname;
      const parts = path.split('/');
      const fileName = decodeURIComponent(parts[parts.length - 1]);
      return fileName.replace(/%20/g, ' ');
    }
  };

  const currentTrackName = getTrackNameFromUrl(musicList[currentTrackIndex]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMusicList());
    }
  }, [status, dispatch]);

  useEffect(() => {
    const handleInteraction = () => {
      setUserInteracted(true);
      document.removeEventListener('mousedown', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };

    document.addEventListener('mousedown', handleInteraction);
    document.addEventListener('keydown', handleInteraction);

    return () => {
      document.removeEventListener('mousedown', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = currentTime;
      if (isPlaying && userInteracted) {
        if (playPromise) {
          playPromise.catch(() => {}); // Отменяем предыдущий запрос на воспроизведение
        }
        setPlayPromise(audioRef.current.play().catch((error: any) => {
          console.error('Play error:', error);
        }));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex, userInteracted]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.load();
      if (playPromise) {
        playPromise.catch(() => {}); // Отменяем предыдущий запрос на воспроизведение
      }
      setPlayPromise(audioRef.current.play().catch((error: any) => {
        console.error('Play error:', error);
      }));
    }
    dispatch(setIsPlaying(!isPlaying));
    setUserInteracted(true); // Устанавливаем флаг взаимодействия после первого нажатия на кнопку
  };

 

  const handleTimeUpdate = () => {
    dispatch(setCurrentTime(audioRef.current.currentTime));
  };

  const handleLoadedMetadata = () => {
    dispatch(setDuration(audioRef.current.duration));
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    audioRef.current.currentTime = time;
    dispatch(setCurrentTime(time));
  };

  useEffect(() => {
    if (userInteracted) {
      audioRef.current.load();
      if (playPromise) {
        playPromise.catch(() => {}); // Отменяем предыдущий запрос на воспроизведение
      }
      setPlayPromise(audioRef.current.play().catch((error: any) => {
        console.error('Play error:', error);
      }));
    }
  }, [currentTrackIndex, userInteracted]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    audioRef.current.volume = newVolume;
    dispatch(setVolume(newVolume));
  };

  useEffect(() => {
    const audioElement = audioRef.current;

    const handleEnded = () => {
      handleNextTrack();
    };

    audioElement.addEventListener('ended', handleEnded);

    return () => {
      audioElement.removeEventListener('ended', handleEnded);
    };
  }, [currentTrackIndex, handleNextTrack]);

  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrackName,
        artist: 'Исполнитель',
        album: 'Альбом',
        artwork: [
          { src: 'https://example.com/cover.jpg', sizes: '96x96', type: 'image/jpeg' },
        ],
      });

      navigator.mediaSession.setActionHandler('play', togglePlay);
      navigator.mediaSession.setActionHandler('pause', togglePlay);
      navigator.mediaSession.setActionHandler('nexttrack', handleNextTrack);
      navigator.mediaSession.setActionHandler('previoustrack', handlePreviousTrack);

      // Установка обработчиков для перемотки
      navigator.mediaSession.setActionHandler('seekbackward', (details) => {
        const seekTime = details.seekOffset || 10; // По умолчанию перемотка на 10 секунд назад
        audioRef.current.currentTime -= seekTime;
        dispatch(setCurrentTime(audioRef.current.currentTime));
      });

      navigator.mediaSession.setActionHandler('seekforward', (details) => {
        const seekTime = details.seekOffset || 10; // По умолчанию перемотка на 10 секунд вперед
        audioRef.current.currentTime += seekTime;
        dispatch(setCurrentTime(audioRef.current.currentTime));
      });
    }
  }, [currentTrackIndex, isPlaying]);

  return (

    <div className='bg-slate-800 py-2 flex justify-between xxs:block xxs:relative'>
      
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      >
        <source src={musicList[currentTrackIndex]} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <div className='flex items-center ml-4'>
        <div className='
          w-56 
          xxs:w-32
          xxs:h-14'>
            <div className='relative overflow-hidden'>
              <h2 className='text-xs font-medium truncate line-clamp-2 whitespace-nowrap'>
                    <span className='inline-block animate-scroll'>{currentTrackName}</span>
              </h2>
            </div>
          <p className='text-slate-400'>Artist</p>
        </div>
        <div className='ml-9 cursor-pointer xxs:hidden' onClick={() => setIsColor(!isColor)}>
          <svg width="18" height="18" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.0009 2.03963C13.4673 -0.25648 17.2787 -0.18027 19.6548 2.28786C22.0299 4.75708 22.1118 8.68955 19.9026 11.2546L10.9988 20.5L2.09703 11.2546C-0.112132 8.68955 -0.0291836 4.75055 2.34482 2.28786C4.72303 -0.177004 8.52711 -0.259747 11.0009 2.03963Z" fill={isColor ? '#63CF6C' : 'white'}/>
          </svg>
        </div>
      </div>

      <div className='flex flex-col items-center relative xxs:static'>
        <div className='flex items-center justify-between w-64 xxs:w-28'> { /* вот сдесь ширина плеера */ }
          <button className='xxs:hidden'>
              <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M16.4708 0.31952C16.0448 0.745547 16.0448 1.43627 16.4708 1.8623L17.1566 2.54813H14.8151C13.3733 2.54813 12.0016 3.21499 11.0522 4.37757L2.94266 14.3076C2.37299 15.0052 1.55001 15.4053 0.684927 15.4053H0V17.5481H0.684927C2.12674 17.5481 3.49837 16.8813 4.44781 15.7187L12.5573 5.78865C13.127 5.0911 13.95 4.69099 14.8151 4.69099H17.4991L16.4708 5.71924C16.0448 6.14527 16.0448 6.836 16.4708 7.26202C16.8968 7.68805 17.5876 7.68805 18.0136 7.26202L21.1313 4.14432C21.3265 3.94906 21.3265 3.63248 21.1313 3.43722L18.0136 0.31952C17.5876 -0.106507 16.8968 -0.106507 16.4708 0.31952ZM1.36879 1.54813C2.76049 1.54813 4.08446 2.19407 5.0009 3.32018L7.45312 6.17275L6 7.54813L3.54806 4.687C2.9982 4.01133 2.20381 3.62377 1.36879 3.62377H0.000425339V1.54813H1.36879ZM11.3284 13.7761C12.2449 14.9022 13.5688 15.5481 14.9605 15.5481H17.6419L16.4708 16.7192C16.0448 17.1453 16.0448 17.836 16.4708 18.262C16.8968 18.688 17.5876 18.688 18.0136 18.262L21.1313 15.1443C21.3265 14.9491 21.3265 14.6325 21.1313 14.4372L18.0136 11.3195C17.5876 10.8935 16.8968 10.8935 16.4708 11.3195C16.0448 11.7455 16.0448 12.4363 16.4708 12.8623L17.081 13.4725H14.9605C14.1255 13.4725 13.3311 13.0849 12.7813 12.4093L11 10.0481L9.5 11.5481L11.3284 13.7761Z" fill="#BABABA"/>
              </svg>
          </button>

          <button onClick={handlePreviousTrack} className='
            xs:block 
            xs:absolute
            xs:top-5
            xs:right-20 
            xxs:hidden'>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M8 7C7.44772 7 7 7.44772 7 8V24C7 24.5523 7.44772 25 8 25H10C10.5523 25 11 24.5523 11 24V18.1512L23.5 24.8738C24.1667 25.2323 25 24.7842 25 24.0671V7.9329C25 7.21582 24.1667 6.76765 23.5 7.12619L11 13.8488V8C11 7.44772 10.5523 7 10 7H8Z" fill="white"/>
            </svg>
          </button>

          <button className='
            xs:right-10
            xxs:absolute 
            xxs:right-2 
            xxs:top-4
            ' 
            
            onClick={togglePlay}>

            {
              isPlaying ? ( <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M40 20C40 31.0457 31.0457 40 20 40C8.9543 40 0 31.0457 0 20C0 8.9543 8.9543 0 20 0C31.0457 0 40 8.9543 40 20ZM13 12C13 11.4477 13.4477 11 14 11H17C17.5523 11 18 11.4477 18 12V28C18 28.5523 17.5523 29 17 29H14C13.4477 29 13 28.5523 13 28V12ZM23 11C22.4477 11 22 11.4477 22 12V28C22 28.5523 22.4477 29 23 29H26C26.5523 29 27 28.5523 27 28V12C27 11.4477 26.5523 11 26 11H23Z" fill="white"/>
                </svg>) : (<svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M24 46C36.1503 46 46 36.1503 46 24C46 11.8497 36.1503 2 24 2C11.8497 2 2 11.8497 2 24C2 36.1503 11.8497 46 24 46ZM17.95 14.2388L34.45 23.1126C35.1833 23.507 35.1833 24.493 34.45 24.8874L17.95 33.7612C17.2167 34.1556 16.3 33.6626 16.3 32.8738V15.1262C16.3 14.3374 17.2167 13.8444 17.95 14.2388Z" fill="white"/>
                  </svg>)
            }

           
          </button>

          <button onClick={handleNextTrack} className='
            xs:block 
            xs:absolute 
            xs:right-2
            xs:top-5
            xxs:hidden'>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M8 7C7.44772 7 7 7.44772 7 8V24C7 24.5523 7.44772 25 8 25H10C10.5523 25 11 24.5523 11 24V18.1512L23.5 24.8738C24.1667 25.2323 25 24.7842 25 24.0671V7.9329C25 7.21582 24.1667 6.76765 23.5 7.12619L11 13.8488V8C11 7.44772 10.5523 7 10 7H8Z" fill="white"/>
            </svg>
          </button>

          <button className='mt-1 xxs:hidden'>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M22 8H10C8.89543 8 8 8.89543 8 10V18C8 19.1046 8.89543 20 10 20H12V22H10C7.79086 22 6 20.2091 6 18V10C6 7.79086 7.79086 6 10 6H22C24.2091 6 26 7.79086 26 10V18C26 20.2091 24.2091 22 22 22H18.843L20.0141 23.1711C20.4401 23.5971 20.4401 24.2879 20.0141 24.7139C19.588 25.1399 18.8973 25.1399 18.4713 24.7139L15.3536 21.5962C15.1583 21.4009 15.1583 21.0843 15.3536 20.8891L18.4713 17.7714C18.8973 17.3454 19.588 17.3454 20.0141 17.7714C20.4401 18.1974 20.4401 18.8881 20.0141 19.3142L19.3282 20H22C23.1046 20 24 19.1046 24 18V10C24 8.89543 23.1046 8 22 8Z" fill="#BABABA"/>
            </svg>
          </button>

        </div>
        
          <div className='
          
            flex 
            items-center
            xxs:absolute
            xxs:w-full
            xxs:bottom-1
            xxs:left: 0
          
          '>
              <div className='text-xs text-gray-400 w-5 xxs:hidden'>{formatTime(currentTime)}</div>
                <input
                        type="range"
                        min="0"
                        max={duration}
                        value={currentTime}
                        onChange={handleSeek}
                        className='
                          w-96 
                          h-1 
                          mx-2 
                          bg-gray-400 
                          overflow-hidden 
                          appearance-none 
                          cursor-pointer
                      
                          '
                      />
              <div className='text-x text-gray-400 w-5 xxs:hidden'>{formatTime(duration)}</div>
         </div>
      </div>  

      <div className='
        flex 
        items-center
        xxs:hidden'>
            <div>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.7" fillRule="evenodd" clipRule="evenodd" d="M22 9H10C9.44772 9 9 9.44772 9 10V11C9 11.5523 9.44772 12 10 12H22C22.5523 12 23 11.5523 23 11V10C23 9.44772 22.5523 9 22 9ZM10 7C8.34315 7 7 8.34315 7 10V11C7 12.6569 8.34315 14 10 14H22C23.6569 14 25 12.6569 25 11V10C25 8.34315 23.6569 7 22 7H10ZM7 17H25V19.5H7V17ZM25 23H7V25.5H25V23Z" fill="white"/>
              </svg>
            </div>
            <div>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.7" fillRule="evenodd" clipRule="evenodd" d="M8.2 9C7.53726 9 7 9.53892 7 10.2037V16.8398C7 17.5 7.5 18 8.2 18H11V20H8C5.74668 20 5 18.1677 5 15.9074V10.6111C5 8.61675 6.21177 7 8.2 7H11V9H8.2ZM24 9H16C15.4477 9 15 9.44772 15 10V23C15 23.5523 15.4477 24 16 24H24C24.5523 24 25 23.5523 25 23V10C25 9.44772 24.5523 9 24 9ZM16 7C14.3431 7 13 8.34315 13 10V23C13 24.6569 14.3431 26 16 26H24C25.6569 26 27 24.6569 27 23V10C27 8.34315 25.6569 7 24 7H16ZM20 22C21.6569 22 23 20.6569 23 19C23 17.3431 21.6569 16 20 16C18.3431 16 17 17.3431 17 19C17 20.6569 18.3431 22 20 22ZM21 13C21 13.5523 20.5523 14 20 14C19.4477 14 19 13.5523 19 13C19 12.4477 19.4477 12 20 12C20.5523 12 21 12.4477 21 13ZM11 23H8V25H11V23Z" fill="white"/>
              </svg>
            </div>

            <div>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.7" fillRule="evenodd" clipRule="evenodd" d="M16.1385 9.74993L9.47894 13.6673C7.50702 14.8273 7.50702 17.679 9.47894 18.8389L16.1385 22.7563V9.74993ZM8.4649 11.9434C5.17837 13.8767 5.17837 18.6295 8.4649 20.5628L16.6314 25.3666C17.2981 25.7588 18.1385 25.2781 18.1385 24.5047V8.00152C18.1385 7.2281 17.2981 6.74745 16.6314 7.13958L8.4649 11.9434ZM19.1387 9.25317C20.1236 9.25317 21.0989 9.44717 22.0088 9.82408C22.9187 10.201 23.7455 10.7534 24.442 11.4499C25.1384 12.1463 25.6909 12.9731 26.0678 13.883C26.4447 14.793 26.6387 15.7683 26.6387 16.7532C26.6387 17.7381 26.4447 18.7134 26.0678 19.6233C25.6909 20.5332 25.1384 21.36 24.442 22.0565C23.7455 22.7529 22.9187 23.3054 22.0088 23.6823C21.0989 24.0592 20.1236 24.2532 19.1387 24.2532V22.2443C19.8598 22.2443 20.5738 22.1022 21.24 21.8263C21.9062 21.5503 22.5116 21.1459 23.0215 20.636C23.5314 20.1261 23.9358 19.5207 24.2118 18.8545C24.4877 18.1883 24.6298 17.4743 24.6298 16.7532C24.6298 16.0321 24.4877 15.318 24.2118 14.6518C23.9358 13.9856 23.5314 13.3803 23.0215 12.8704C22.5116 12.3605 21.9062 11.956 21.24 11.6801C20.5738 11.4041 19.8598 11.2621 19.1387 11.2621V9.25317ZM21.3311 14.5363C20.7997 13.8955 20.053 13.4431 19.213 13.2532L19.1387 20.2532C19.9826 20.079 20.7387 19.6408 21.2836 19.0101C21.8285 18.3795 22.1299 17.5936 22.1385 16.781C22.1471 15.9684 21.8625 15.177 21.3311 14.5363Z" fill="white"/>
              </svg>

            </div>

            <div className="relative w-full">
                  <input type="range"
                   className="rounded-lg overflow-hidden appearance-none bg-gray-400 h-2 w-128 cursor-pointer" 
                   min="0"
                   max="1"
                   step="0.01"
                   value={volume}
                   onChange={handleVolumeChange}
                   />
            </div>
            
            <div className='mt-1'>

              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M24.5 7H23.9058H23.8979H20.0909C19.4884 7 19 7.48842 19 8.09091C19 8.6934 19.4884 9.18182 20.0909 9.18182H21.2652L18.3216 12.1253C17.8928 12.5542 17.8928 13.2495 18.3216 13.6784C18.7505 14.1072 19.4458 14.1072 19.8746 13.6784L22.8182 10.7348V11.9091C22.8182 12.5116 23.3066 13 23.9091 13C24.5116 13 25 12.5116 25 11.9091V8.0982V8.09807V7.5C25 7.22386 24.7761 7 24.5 7ZM7.5 25H8.09417H8.10212H11.9091C12.5116 25 13 24.5116 13 23.9091C13 23.3066 12.5116 22.8182 11.9091 22.8182H10.7348L13.6784 19.8746C14.1072 19.4458 14.1072 18.7505 13.6784 18.3216C13.2495 17.8928 12.5542 17.8928 12.1254 18.3216L9.18182 21.2652V20.0909C9.18182 19.4884 8.6934 19 8.09091 19C7.48842 19 7 19.4884 7 20.0909V23.9018V23.9019V24.5C7 24.7761 7.22386 25 7.5 25Z" fill="white"/>
              </svg>

            </div>

      </div>
      
    </div>
  )
}



