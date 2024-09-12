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
    const [userSearch, setUserSearch] = useState('')
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
      <header className='flex justify-between py-5 items-center w-full'>

        <div className=' xxs:text-xl font-bold'>
          My music 
        </div>

        <div className='flex justify-between'>

            <div className='flex sm:block xxs:hidden'>
                <button className=''>
                  <Image src="/static/arrow.svg" alt='arrow' width={13} height={22} />
                </button>
                <button className='ml-5 rotate-180'>
                  <Image src="/static/arrow.svg" alt='arrow' width={13} height={22} />
                </button>
            </div>
    
            <form className='relative sm:block xxs:hidden'>
                <Input 
                  type='search' 
                  placeholder='Artist, songs, or podcasts' 
                  className='rounded-full pl-8 pr-2 py-1 text-black font-medium' 
                  value={userSearch} 
                  onChange={(event:React.ChangeEvent<HTMLInputElement>) => setUserSearch(event.target.value)}/>
                <Image src="/static/search.svg" alt="User Icon" width={15} height={16} className='absolute top-2 left-3' />
            </form>
        </div>
       
          <div className='sm:block xxs:hidden'>
            <div className='flex items-center cursor-pointer' onClick={() => setIsOpen(!isOpen)} >
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

        <div>
          <Image src="/static/settings.svg" alt="settings" width={32} height={32} className='' />
        </div>

        </header> 
  )
}

// absolute top-1 left-0

// ml-8

// min-w-200 relative left-20



// absolute -top-3 left-12





{/* <div className='relative'>
<div className='flex w-20 mr-8 '>
      <button className=''>
        <Image src="/static/arrow.svg" alt='arrow' width={13} height={22} />
      </button>
      <button className='ml-5 rotate-180'>
        <Image src="/static/arrow.svg" alt='arrow' width={13} height={22} />
      </button>
  </div>
</div>


<div className='lg:min-w-70 md:w-1/2 lg:ml-0 md:ml-10 xs:w-32'>

  <form className='relative lg:ml-0 lg:mr-0  md:ml-10 md:-mr-2'>
      <Input 
        type='search' 
        placeholder='Artist, songs, or podcasts' 
        className='rounded-full pl-8 pr-2 py-1 text-black font-medium' 
        value={userSearch} 
        onChange={(event:React.ChangeEvent<HTMLInputElement>) => setUserSearch(event.target.value)}/>
      <Image src="/static/search.svg" alt="User Icon" width={15} height={16} className='absolute top-2 left-3' />
  </form>

</div> */}