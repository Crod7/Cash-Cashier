// Manages Loading State.

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SaveImageState {
    saveImage: any;
}

const initialState: SaveImageState = {
    saveImage: '',
};

const saveImageSlice = createSlice({
    name: 'saveImage',
    initialState,
    reducers: {
        setSaveImage: (state, action: PayloadAction<any>) => {
            state.saveImage = action.payload;
        },
    },
});

export const { setSaveImage } = saveImageSlice.actions;
export default saveImageSlice.reducer;

export type { SaveImageState }; // Export the type
