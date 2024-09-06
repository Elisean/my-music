'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '../UI/Button/Button'
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { app } from "@/app/configs/firebase";
import Link from "next/link";
import { getUserImageURL } from '@/app/configs/uploadImageFireBase';
import { checkUserAuthentication } from '@/app/providers/authProvider';
import Image from 'next/image';
import { Input } from '../UI/Input/Input';

export const Header:React.FC = () => {
  

    const [user, setUser] = useState<any>(null);
    const [imageUrl, setImageUrl] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [userSearch, setuserSearch] = useState('')
    const auth = getAuth(app);
    const router = useRouter();



    
    useEffect(() => {
      const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
        setUser(
          auth ? {
            id: user?.uid, 
            name: user?.displayName  
          } : null
        )
      });
      return () => unsubscribeAuth();
    }, [auth]);
  
     useEffect(() => {
      const fetchImage = async (user:any) => {
        if (user) {
          const url = await getUserImageURL(user.uid);
          if (url) {
            setImageUrl(url);
          }
        }
      };
  
      checkUserAuthentication(setUser);
      fetchImage(auth.currentUser);
    }, [user]);

    const handleSignOut = async () => {
        try {
         window.location.reload()
          await signOut(auth);
          router.push('/');
         
        } catch (error) {
          console.error('Error signing out:', error);
        }
      };

  return (
    <header className=' flex justify-between py-5 relative items-center'>
        <div className='ml-11'>
          My music 
        </div>

        <div className='absolute top-6 left-64'>
          <button>
            <Image src="/static/arrow.svg" alt='arrow' width={13} height={22} />
          </button>
          <button className='ml-12 rotate-180'>
            <Image src="/static/arrow.svg" alt='arrow' width={13} height={22} />
          </button>
        </div>
          <form className='min-w-70 relative'>
        
              <Input 
                type='search' 
                placeholder='Artist, songs, or podcasts' 
                className='rounded-full pl-8 pr-2 py-1 text-black font-medium' 
                value={userSearch} 
                onChange={(event:React.ChangeEvent<HTMLInputElement>) => setuserSearch(event.target.value)}/>
               <Image src="/static/search.svg" alt="User Icon" width={15} height={16} className='absolute top-2 left-3' />
          </form>
          <div>
            <div className='flex items-center absolute top-5 right-11 cursor-pointer' onClick={() => setIsOpen(!isOpen)} >
                  {
                    imageUrl ? <Image src={imageUrl} alt='avatar' width={34} height={34} className='rounded-3xl mr-2' /> : <Image src="/static/user.svg" alt="User Icon" width={30} height={30} className='mr-1 ' />
                  } 
                  
                  {user ? <p className=''>{user.displayName}</p> : <p className=''>Loading...</p>}
                    
                    <Image src="/static/shevron.svg" alt="shevron" width={14} height={7} className='ml-1' />
                  </div>
                  
                  <div className={`flex justify-end items-end flex-col absolute h-auth rounded-xl bg-slate-800 py-2 px-6 top-14 right-11 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-2' : 'opacity-0 translate-y-0'}`}>
                          
                  <div className=''>Личный кабинет</div>
                  <Button id='sign-out' type="button" onClick={handleSignOut}> Выйти </Button>
              </div>
          </div>
    </header>
  )
}

