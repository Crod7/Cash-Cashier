import React, { useEffect, useState } from 'react';
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
import GeneratePopUpShopID from '@/lib/database/apiFunctions/popUpShop/GeneratePopUpShopID';

const StartPage: React.FC = () => {
    const dispatch = useDispatch();
    const { user, error, isLoading } = useUser();

    // Used to control visibility of the new shop modal
    const [showNewShopModal, setShowNewShopModal] = useState(false);

    // Controls the item's different variables
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [shopFee, setShopFee] = useState("");

    // Controls the input validation for the new shop modal
    const [nameInvalid, setNameInvalid] = useState(false);
    const [locationInvalid, setLocationInvalid] = useState(false);
    const [shopFeeInvalid, setShopFeeInvalid] = useState(false);
    const [formIsValid, setFormIsValid] = useState(true);

    // Redux
    const page = useSelector((state: any) => state.page.page)
    const userData = useSelector((state: any) => state.user.userData);

    // =============================================================================================================================================================================
    // User edits the shop linked to their 'currentPopUpShopID'
    const handleShopClick = () => {
        dispatch(setPage('Shop'))
    }
    // =============================================================================================================================================================================
    // When the Start button is pressed we add a new shop to the user's shop history and set their current shop to this new one

    const handleNewShopModalSubmit = async (event: { preventDefault: () => void; }) => {

        event.preventDefault(); // Prevent the default form submission behavior from reloading the page



        // We reset validation checks
        setNameInvalid(false)
        setLocationInvalid(false)
        setShopFeeInvalid(false)
        setFormIsValid(true)

        if (name.trim() === "") {
            setNameInvalid(true)
            setFormIsValid(false)
        }
        if (location.trim() === "") {
            setLocationInvalid(true)
            setFormIsValid(false)
        }
        if (shopFee.trim() === "") {
            setShopFeeInvalid(true)
            setFormIsValid(false)
        }
        // We use formIsValid so that if more than one field is incorrect, we can let the user know which fields need modifying.
        if (!formIsValid) {
            return
        }

        dispatch(setLoadingScreen(true));

        try {
            // We grab the current user.
            const userToBeUpdated = await GetUser(user?.email);

            // We grab the next available PopUpShopID
            const nextPopUpShopID = await GeneratePopUpShopID();

            let currentDateTime = new Date()
            const NewPopUpShop: PopUpShop = {
                PopUpShopID: nextPopUpShopID,
                name: name,
                location: location,
                total: 0,
                dateOpened: currentDateTime,
                popUpShopFee: shopFee
            };
            // Add new Pop-Up Shop to database.
            await PostPopUpShop(NewPopUpShop)

            // Append the new shop to the user's shop history
            const updatedShopHistory = [
                ...(userToBeUpdated.shopHistory || []), // Copy existing history if it exists
                nextPopUpShopID
            ];

            // Update the user's data with the updated shop history, as well it sets the current pop up shop
            const updatedUser = {
                ...userToBeUpdated,
                shopHistory: updatedShopHistory,
                currentPopUpShopID: nextPopUpShopID // User uses this to modify this current shop next
            };

            await UpdateUser(updatedUser);

            // Once everything is updated we transfer the user to the shop page. 
            dispatch(setPage('Shop'))
        } catch (error) {
            console.error('Error at src.components.StartPage.handleNewShopModalSubmit() :', error);
        }
        dispatch(setLoadingScreen(false));

    };

    // =============================================================================================================================================================================


    return (
        <div className='w-[100vw] h-[100vh] flex justify-center items-center flex-col'>
            {/* This is the modal that appears when the user hits START. The user must enter information to start a new Pop-up Event. */}
            {(showNewShopModal) && (
                <form onSubmit={handleNewShopModalSubmit}>

                    <div className='fixed top-0 left-0 w-full h-full bg-opacity-50 bg-black flex justify-center items-center z-40'>
                        <div className='w-[450px] h-[500px] p-5 rounded-xl' style={{ backgroundColor: '#E6E6FA' }}>
                            <button className="ml-[97%] font-extrabold text-xl" onClick={() => {
                                setShowNewShopModal(false);
                            }}>
                                x
                            </button>
                            <div className='flex justify-between'>
                                <div>
                                    <div className='font-extrabold'>
                                        <div className='flex'>
                                            <div>
                                                Name:
                                            </div>
                                            <div className='pl-5 text-red-500'>
                                                {(nameInvalid) && (
                                                    <div>Name of event</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className='w-[410px]'>
                                            <input
                                                type="text"
                                                placeholder='Name of shop'
                                                className='p-2 my-2 rounded-2xl shadow-xl border w-[100%] font-extrabold'
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>

                                    </div>
                                    <div className='font-extrabold'>
                                        <div className='flex'>
                                            <div>
                                                Location:
                                            </div>
                                            <div className='pl-4 text-red-500'>
                                                {(locationInvalid) && (
                                                    <div>Please Enter a Location!</div>
                                                )}
                                            </div>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder='Address'
                                            className='p-2 my-2 rounded-2xl shadow-xl border w-[100%] font-extrabold'
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                        />
                                    </div>
                                    <div className='font-extrabold'>
                                        <div className='flex'>
                                            <div>
                                                Pop-up Shop Fee:
                                            </div>
                                            <div className='pl-4 text-red-500'>
                                                {(shopFeeInvalid) && (
                                                    <div>Please Enter a Fee!</div>
                                                )}
                                            </div>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder='Fee Amount'
                                            className='p-2 my-2 rounded-2xl shadow-xl border w-[100%] font-extrabold'
                                            value={shopFee}
                                            onChange={(e) => setShopFee(e.target.value)}
                                        />
                                    </div>
                                    <button type="submit" className='font-extrabold bg-yellow-200 p-4 mt-4 min-w-[150px] rounded-2xl'>Submit</button>

                                </div>
                            </div>
                        </div>

                    </div>
                </form>
            )}

            <button className='border-4 border-black rounded px-16 py-8 text-4xl font-extrabold' onClick={() => { setShowNewShopModal(true); }}>Start</button>
            <button className='border-4 border-black rounded px-16 py-8 text-4xl font-extrabold' onClick={handleShopClick}>Shop</button>
            <button className='border-4 border-black rounded px-16 py-8 text-4xl font-extrabold'>History</button>
        </div>
    );
}

export default StartPage;
