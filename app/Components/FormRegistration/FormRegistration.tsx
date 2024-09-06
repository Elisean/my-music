'use client'
import React, { useEffect, useState } from 'react'
import { Input } from '../UI/Input/Input';
import { Button } from '../UI/Button/Button';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signOut, updateProfile} from 'firebase/auth'
import { IUserData } from '../../types';
import { app } from '@/app/configs/firebase';
import Title from '../UI/Title/Title';
import { useDispatch } from 'react-redux';
import { setIsAuth } from '../../Store/Slices/authSlise';



export const FormRegistration:React.FC = () => {

  const dispatch = useDispatch();


  const [userData, setUserData] = useState<IUserData>({
    userName: '',
    userEmail: '',
    userPassword: ''

} as IUserData)


  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const auth = getAuth(app);



  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userData.userPassword) {
      alert('Password is required');
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        userData.userEmail,
        userData.userPassword,
      );

      await updateProfile(res.user, {
        displayName: userData.userName
      });
      await signOut(auth);

    } catch (error) {
      console.log(error);
    }

    onAuthStateChanged(auth, () => {
      if(auth){
        alert('User registered successfully');
      }
      dispatch(setIsAuth(true))
    });

    setUserData({
      userName: '',
      userEmail: '',
      userPassword: ''
  })
};

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user && registrationSuccess) {
      alert('User registered successfully');
      dispatch(setIsAuth(true))
      setRegistrationSuccess(false); // Сбросить флаг после отображения сообщения
    }
  });

  return () => unsubscribe(); // Отписаться от onAuthStateChanged при размонтировании компонента
}, [auth, registrationSuccess]);

  
  return (
    <>
        <Title className='text-center'>Зарегистрируйтесь</Title>
            <form onSubmit={handleSubmit} className='w-full'>
                <div>
                    <Input type='text' id='name' placeholder='Your full name' label='Name' value={userData.userName ?? ''} className='text-white bg-slate-800 rounded-xl p-2 text-sm my-1' onChange={event => setUserData({...userData, userName:event.target.value})} />
                </div>
                <div>
                    <Input type='email' id='email' placeholder='Your email address' label='Email' value={userData.userEmail} className='text-white bg-slate-800 rounded-xl p-2 text-sm my-1' onChange={event => setUserData({...userData, userEmail:event.target.value})} />
                </div>
                <div>
                    <Input type='password' id='password'  placeholder='Your password' label='Password' value={userData.userPassword} className='text-white bg-slate-800 rounded-xl p-2 text-sm my-1' onChange={event => setUserData({...userData, userPassword:event.target.value})} />
                </div>    
                    <Button className='w-full bg-blue-500 mt-6 mb-4 py-2 rounded-xl'>Регистрация</Button>
            </form>
    </>
  )
}