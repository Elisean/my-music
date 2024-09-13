import { ReactNode } from "react";
import { ThunkAction, Action } from '@reduxjs/toolkit';
export interface ComponentTypes {
    children: ReactNode | string
}

export interface IInput {
    type?:string;
    placeholder:string;
    value?:string
    error?:string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    textChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    id?: string
    label?: string
    name?:string
    className?:string
}

export interface MusicState {
    musicList: string[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    currentTrackIndex: number;
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    volume: number;
    activeTrackIndex:number;
}

export interface IUserData {
    userEmail:string,
    userPassword:string,
    userName?:string 
}


export interface RootState {
    auth: {
      ISAUTH: boolean;
    };
    music: MusicState   
}


export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;