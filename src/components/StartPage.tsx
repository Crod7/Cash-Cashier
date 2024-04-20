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

    const handleShopClick = () => {
        dispatch(setPage('Shop'))
    }





    return (
        <div className='w-[100vw] h-[100vh] flex justify-center items-center flex-col'>
            <button className='border-4 border-black rounded px-16 py-8 text-4xl font-extrabold'>Start</button>
            <button className='border-4 border-black rounded px-16 py-8 text-4xl font-extrabold' onClick={handleShopClick}>Shop</button>
            <button className='border-4 border-black rounded px-16 py-8 text-4xl font-extrabold'>History</button>
        </div>
    );
}

export default StartPage;
