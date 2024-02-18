import React, { useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

// Redux Imports
import { setUserData } from '@/src/store/userSlice';
import { setLoadingScreen } from '@/src/store/loadingScreenSlice';
import { setPage } from '../store/pageSlice';
import { useDispatch } from 'react-redux';
//Redux Imports
import { useSelector } from 'react-redux';


const StartPage: React.FC = () => {
    const dispatch = useDispatch();
    const { user, error, isLoading } = useUser();

    // Redux
    const page = useSelector((state: any) => state.page.page)
    const userData = useSelector((state: any) => state.user.userData);







    return (
        <div className='w-[100vw] h-[100vh] flex justify-center items-center flex-col'>
            <button>Start</button>
            <button>History</button>
        </div>
    );
}

export default StartPage;
