'use client'
import { PlayList } from "@/app/Components/PlayList/PlayList";
import { TrackList } from "@/app/Components/TrackList/TrackList";
import Title from "@/app/Components/UI/Title/Title";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMusicList, setCurrentTrackIndex, setIsPlaying, resetMusicList, setClickIsMusic } from '@/app/Store/Slices/musicListSlice';
import { RootState, AppDispatch } from '@/app/Store/store';



function Home() {
  const [isOpenPlaylist, setIsOpenPlaylist] = useState(false)
  const dispatch = useDispatch<AppDispatch>();
  const trackListRef = useRef<any>(null)
  const musicList = useSelector((state: RootState) => state.music.musicList);
  const currentTrackIndex = useSelector((state: RootState) => state.music.currentTrackIndex);
  const activeTrackIndex = useSelector((state: RootState) => state.music.activeTrackIndex);

  const loadMusic = (currentPlaylist:string) =>{
    if(currentPlaylist) {
      setIsOpenPlaylist(!isOpenPlaylist)
      dispatch(setClickIsMusic(true))
    }
    dispatch(fetchMusicList(currentPlaylist))

  }


  const handleTrackClick = (index: number) => {
    dispatch(setCurrentTrackIndex(index));
    dispatch(setIsPlaying(true)); // Устанавливаем состояние воспроизведения в true при выборе трека
    dispatch(setClickIsMusic(true))
  };

  const getTrackNameFromUrl = (url: string) => {
    if (url) {
      const path = new URL(url).pathname;
      const parts = path.split('/');
      const fileName = decodeURIComponent(parts[parts.length - 1]);
      return fileName.replace(/%20/g, ' ');
    }
  };


  const closedPlaylist = () =>{
    setIsOpenPlaylist(false);
  }


 

    return (
      <main className="bg-gradient-homePage w-full xxs:px-2 relative">
        <Title className="xxs:mt-7">Your Playlists</Title>
        <div className="
          w-full 
          flex 
          justify-between 
          flex-wrap
          ">
          <PlayList onClick={(event:any) => loadMusic(event.target.textContent)}>
              EnglishMusic
          </PlayList>

          <PlayList onClick={(event:any) => loadMusic(event.target.textContent)}>
              JapaneseMusic
          </PlayList>

          <PlayList onClick={(event:any) => loadMusic(event.target.textContent)}>
              RussianMusic
          </PlayList>
        </div>
        {
        isOpenPlaylist && (
          <div className='flex flex-col items-center w-full h-screen fixed left-0 top-0 bg-black bg-opacity-50'>
          
            {musicList.length === 0 ? (
                  <p className='text-white text-sm'>Wait! Music loading</p>
                ) : (
                  <div ref={trackListRef}>
                  <TrackList className='pt-3 w-72 border-4 rounded-xl border-teal-100 overflow-x-hidden h-96 bg-black absolute top-0 left-50% translate-x-[-50%] translate-y-[50%]'>

                        <div className="absolute -top-1 -right-1 bg-teal-100 w-6 h-6 rounded-lg text-black text-xl font-bold flex items-center justify-center" onClick={closedPlaylist}>
                          x
                        </div>

                      {musicList.map((url, index) => (
                          <div
                            key={index}
                            onClick={() => handleTrackClick(index)}
                            style={{
                              backgroundColor: index === activeTrackIndex ? 'lightblue' : 'transparent',
                              color: index === activeTrackIndex ? 'black' : 'white',
                              fontSize: index === activeTrackIndex ? '12px' : '12px',
                              fontWeight: index === activeTrackIndex ? 'bold' : '',
                              cursor: 'pointer',
                              margin: '8px 16px',
                              borderRadius: '4px',
                            }}
                          >
                            {getTrackNameFromUrl(url)}
                          </div>
                        ))}
             
                  </TrackList>
                  </div>
                )}
          </div>
        )
        }
      </main>
    );
  }
export default Home;