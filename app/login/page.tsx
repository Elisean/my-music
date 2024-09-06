'use client'

import { FormAuth } from "@/app/Components/FormAuth/FormAuth";
import { FormRegistration } from "@/app/Components/FormRegistration/FormRegistration";
import { setIsAuth } from "@/app/Store/Slices/authSlise";
import { useSelector,  useDispatch  } from "react-redux";
import { RootState } from "@/app/types";

export default function Login() {

  const dispatch = useDispatch();

  const isLogin = useSelector((state:RootState) => state.auth.ISAUTH);

    return (
            <div className="mx-auto flex flex-col items-center justify-center h-screen w-full max-w-xs">
                {
                  isLogin ? <FormAuth/> : <FormRegistration/>
                }
    
                {
                  isLogin ?  <p> Нет аккаунта? <span className="cursor-pointer" onClick={() => dispatch(setIsAuth(false))}>Зарегистрируйтесь</span></p> : 
                  <p>  Есть аккаунт? <span className="cursor-pointer" onClick={() => dispatch(setIsAuth(true))}>Войдите</span></p>    
                } 
            </div>  
    );
  }
  