// Manages User data.

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import UserData from '@/src/types/UserData';

interface UserState {
    userData: UserData | null;
}

const initialState: UserState = {
    userData: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<UserData | null>) => {
            state.userData = action.payload;
        },
    },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
