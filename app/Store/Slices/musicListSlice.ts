import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../../configs/firebase'; 
import { MusicState } from '../../types'; 

// Создаем асинхронный thunk для загрузки данных
export const fetchMusicList = createAsyncThunk(
    'music/fetchMusicList',
    async () => {
      const listRef = ref(storage, 'JapaneseMusic');
      const res = await listAll(listRef);
      const promises = res.items.map((itemRef) => getDownloadURL(itemRef));
      const urls = await Promise.all(promises);
      return urls;
    }
  );
  
  const initialState: MusicState = {
    musicList: [],
    status: 'idle',
    error: null,
    currentTrackIndex: 0,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    activeTrackIndex: 0, // Добавляем состояние для активного трека
  };
  
  const musicSlice = createSlice({
    name: 'music',
    initialState,
    reducers: {
      setCurrentTrackIndex: (state, action) => {
        state.currentTrackIndex = action.payload;
        state.activeTrackIndex = action.payload; // Обновляем активный трек
      },
      setIsPlaying: (state, action) => {
        state.isPlaying = action.payload;
      },
      setCurrentTime: (state, action) => {
        state.currentTime = action.payload;
      },
      setDuration: (state, action) => {
        state.duration = action.payload;
      },
      setVolume: (state, action) => {
        state.volume = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchMusicList.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchMusicList.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.musicList = action.payload;
        })
        .addCase(fetchMusicList.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message || 'An error occurred';
        });
    },
  });
  
  export const {
    setCurrentTrackIndex,
    setIsPlaying,
    setCurrentTime,
    setDuration,
    setVolume,
  } = musicSlice.actions;
  export default musicSlice.reducer;