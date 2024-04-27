import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import ImageUploaderButton from './Image-Uploader/Image-Uploader';


// Redux Imports
import { setUserData } from '@/src/store/userSlice';
import { setLoadingScreen } from '@/src/store/loadingScreenSlice';
import { setPage } from '../store/pageSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


const StartPage: React.FC = () => {
    const dispatch = useDispatch();
    const { user, error, isLoading } = useUser();

    // Used to control visibility of modal
    const [showAddModal, setShowAddModal] = useState(false);

    // Controls the item's different variables
    const [itemName, setItemName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [imageUrl, setImageUrl] = useState("");


    // Redux
    const page = useSelector((state: any) => state.page.page);
    const userData = useSelector((state: any) => state.user.userData);
    const saveImageData = useSelector((state: any) => state.saveImage.saveImage)

    const handleAddButton = () => {
        setImageUrl('')
        setShowAddModal(true)
        console.log(imageUrl)
    }

    const handleAddItem = () => {

    }

    // On image upload we hold its url. If the item is saved we add this as the image.
    useEffect(() => {
        setImageUrl(saveImageData)
        console.log(imageUrl)
    }, [saveImageData]);


    return (
        <div className='flex flex-col p-2'>
            {(showAddModal) && (
                <form onSubmit={handleAddItem}>

                    <div className='fixed top-0 left-0 w-full h-full bg-opacity-50 bg-black flex justify-center items-center z-40'>
                        <div className='w-[900px] h-[500px] p-5 rounded-xl' style={{ backgroundColor: '#E6E6FA' }}>
                            <button className="ml-[97%] font-extrabold text-xl" onClick={() => {
                                setShowAddModal(false);
                            }}>
                                x
                            </button>
                            <div className='flex justify-between'>
                                <div>
                                    <div className='bg-gray-300 h-[300px] mx-10'>
                                        <img src={imageUrl} />
                                    </div>
                                    <ImageUploaderButton />
                                </div>
                                <div>
                                    <div className='font-extrabold'>
                                        Item Name:
                                        <input
                                            type="text"
                                            placeholder='Item'
                                            className='p-2 my-2 rounded-2xl shadow-xl border w-[100%] font-extrabold'
                                            value={itemName}
                                            onChange={(e) => setItemName(e.target.value)}
                                        />
                                    </div>
                                    <div className='font-extrabold'>
                                        Quantity:
                                        <input
                                            type="text"
                                            placeholder='Amount in this budget'
                                            className='p-2 my-2 rounded-2xl shadow-xl border w-[100%] font-extrabold'
                                            value={quantity}
                                            onChange={(e) => setQuantity(e.target.value)}
                                        />
                                    </div>
                                    <div className='font-extrabold'>
                                        Price:
                                        <input
                                            type="text"
                                            placeholder='Amount in this budget'
                                            className='p-2 my-2 rounded-2xl shadow-xl border w-[100%] font-extrabold'
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                    </div>
                                    <button type="submit" className='font-extrabold bg-yellow-200 p-4 min-w-[150px] rounded-2xl'>Submit Changes</button>

                                </div>
                            </div>
                        </div>

                    </div>
                </form>
            )}
            <button className='w-[100px] h-[100px] bg-green-400 rounded-md flex justify-center items-center flex-col' onClick={handleAddButton}>+</button>
        </div>
    );
}

export default StartPage;
