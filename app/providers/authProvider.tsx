'use client'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const authProvider = (WrappedComponent: any) => {
  const WithAuth = (props:any) => {
    const router = useRouter();


    useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (user) => {
 
        if (!user) {
          router.push('/'); // Перенаправляем на страницу входа, если пользователь не аутентифицирован
        }
      });

  
      return () => unsubscribe();
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export const checkUserAuthentication = (callback:any) => {
  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      callback(user);
    } else {
      callback(null);
    }
  });
};




export default authProvider;