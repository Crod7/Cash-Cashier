import React from 'react';
import LoadingScreen from '../components/Utility/Loading-Feature/LoadingScreen';
import Navbar from '@/src/components/Navbar';
//Redux Imports
import { useSelector } from 'react-redux';

export default function BasePage() {
    // Redux
    const userData = useSelector((state: any) => state.user.userData);
    const loadingScreen = useSelector((state: any) => state.loadingScreen.loadingScreen);
    const page = useSelector((state: any) => state.page.page)

    return (
        <div>
            {loadingScreen && (
                <LoadingScreen />
            )}
            <Navbar />
        </div>
    );
}
