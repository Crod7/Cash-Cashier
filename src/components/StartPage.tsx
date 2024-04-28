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
import UserData from '../types/UserData';

// Api
import GetUser from '@/lib/database/apiFunctions/user/GetUser';
import UpdateUser from '@/lib/database/apiFunctions/user/UpdateUser';
import PostPopUpShop from '@/lib/database/apiFunctions/popUpShop/PostPopUpShop';
import GetPopUpShop from '@/lib/database/apiFunctions/popUpShop/GetPopUpShop';
import GeneratePopUpShopID from '@/lib/database/apiFunctions/popUpShop/GeneratePopUpShopID';

const StartPage: React.FC = () => {
    const dispatch = useDispatch();
    const { user, error, isLoading } = useUser();

    // Redux
    const page = useSelector((state: any) => state.page.page)
    const userData = useSelector((state: any) => state.user.userData);

    const handleShopClick = () => {
        dispatch(setPage('Shop'))
    }

    // When the Start button is pressed we add a new shop to the user's shop history and set their current shop to this new one ================================================
    const handleStartClick = async () => {
        dispatch(setLoadingScreen(true));

        try {
            // We grab the current user.
            const userToBeUpdated = await GetUser(user?.email);

            const NewPopUpShop: PopUpShop = {
                PopUpShopID: 122311,
                name: 'name',
                location: 'location',
                total: 0,
                dateOpened: '',
                popUpShopFee: 0
            };
            await PostPopUpShop(NewPopUpShop)

            // Append the new shop to the user's shop history
            const updatedShopHistory = [
                ...(userToBeUpdated.shopHistory || []), // Copy existing history if it exists
                NewPopUpShop.PopUpShopID
            ];

            // Update the user's data with the updated shop history, as well it sets the current pop up shop
            const updatedUser = {
                ...userToBeUpdated,
                shopHistory: updatedShopHistory,
                currentPopUpShopID: NewPopUpShop.PopUpShopID
            };

            await UpdateUser(updatedUser);
        } catch (error) {
            console.error('Error at src.components.StartPage.handleStartClick() :', error);
        }
        dispatch(setLoadingScreen(false));
    };



    // When the Start button is pressed we add a new shop to the user's shop history and set their current shop to this new one ================================================
    const handleTestClick = async () => {
        dispatch(setLoadingScreen(true));

        try {
            const test = await GeneratePopUpShopID();
            console.log(test)

        } catch (error) {
            console.error('Error at src.components.StartPage.handleTestClick() :', error);
        }
        dispatch(setLoadingScreen(false));
    };




    return (
        <div className='w-[100vw] h-[100vh] flex justify-center items-center flex-col'>
            <button className='border-4 border-black rounded px-16 py-8 text-4xl font-extrabold' onClick={handleTestClick}>Check Api</button>

            <button className='border-4 border-black rounded px-16 py-8 text-4xl font-extrabold' onClick={handleStartClick}>Start</button>
            <button className='border-4 border-black rounded px-16 py-8 text-4xl font-extrabold' onClick={handleShopClick}>Shop</button>
            <button className='border-4 border-black rounded px-16 py-8 text-4xl font-extrabold'>History</button>
        </div>
    );
}

export default StartPage;
