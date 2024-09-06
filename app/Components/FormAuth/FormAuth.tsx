import React, { useState } from 'react'
import Title from '../UI/Title/Title'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from "next/navigation"
import { Button } from '../UI/Button/Button';
import { Input } from '../UI/Input/Input';
import { app } from '@/app/configs/firebase';
import { IUserData } from '../../types';


export const FormAuth:React.FC = () => {
  const [userData, setUserData] = useState<IUserData>({
    userEmail: '',
    userPassword: ''
} as IUserData)


const auth = getAuth(app);

const router = useRouter();

  const handleAuth =  async (event: React.FormEvent<HTMLFormElement>) =>{
      event.preventDefault();
        try {
         await signInWithEmailAndPassword(
              auth,
              userData.userEmail, 
              userData.userPassword,
            )


        } catch (error:any) {
            console.log(error.message)
        }
        
        setUserData({
            userEmail: '',
            userPassword: ''
        })
  }

  onAuthStateChanged(auth, (user) => {

    if (user) {
      router.push('pages/home'); 
    } else {
      console.log('No user is signed in');
    }
  });

  return (
    <>

      <Title>Войдите</Title>
    
      <form onSubmit={handleAuth} className='w-full'>
            <div>
                <Input type='email' placeholder='Your email address' value={userData.userEmail} className='text-white bg-slate-800 rounded-xl p-2 text-sm my-1' label='Email' onChange={event => setUserData({...userData, userEmail:event.target.value})}/>
            </div>
            <div className='inner-form'>
                <Input type='password' placeholder='Your password'  value={userData.userPassword} label='Password' className='text-white bg-slate-800 rounded-xl p-2 text-sm my-1' onChange={event => setUserData({...userData, userPassword:event.target.value})}/>
            </div>    
            <Button className='w-full bg-blue-500 mt-6 mb-4 py-2 rounded-xl'>Вход</Button>
      </form>
    
    </>

      
  )
}


