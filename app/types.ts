import { ReactNode } from "react";

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


export interface IUserData {
    userEmail:string,
    userPassword:string,
    userName?:string 
}


export interface RootState {
    auth: {
      ISAUTH: boolean;
 
    };   
}