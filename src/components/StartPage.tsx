import React, { useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

// Redux Imports
import { setUserData } from '@/src/store/userSlice';
import { setLoadingScreen } from '@/src/store/loadingScreenSlice';
import { setPage } from '../store/pageSlice';
import { useDispatch } from 'react-redux';
// Redux Imports
import { useSelector } from 'react-redux';

// Interfaces
import PopUpShop from '@/src/types/PopUpShop';

// Api
import PostPopUpShop from '@/lib/database/apiFunctions/popUpShop/PostPopUpShop';


const StartPage: React.FC = () => {
    const dispatch = useDispatch();
    const { user, error, isLoading } = useUser();

    // Redux
    const page = useSelector((state: any) => state.page.page)
    const userData = useSelector((state: any) => state.user.userData);

    const handleShopClick = () => {
        dispatch(setPage('Shop'))
    }

    const handleStartClick = async () => {
        dispatch(setLoadingScreen(true))
        const NewPopUpShop = {
            PopUpShopID: 1
        }
        await PostPopUpShop(NewPopUpShop)
        dispatch(setLoadingScreen(false))
    }





    return (
        <div className='w-[100vw] h-[100vh] flex justify-center items-center flex-col'>
            <button className='border-4 border-black rounded px-16 py-8 text-4xl font-extrabold' onClick={handleStartClick}>Start</button>
            <button className='border-4 border-black rounded px-16 py-8 text-4xl font-extrabold' onClick={handleShopClick}>Shop</button>
            <button className='border-4 border-black rounded px-16 py-8 text-4xl font-extrabold'>History</button>
        </div>
    );
}

export default StartPage;
