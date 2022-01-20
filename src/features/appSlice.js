import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        channelId: null,
        categoryId: null,
        channelName: null,
        categoryName: null
    },
    reducers: {
        setChannelInfo: (state, action) => {
            state.channelId = action.payload.channelId;
            state.channelName = action.payload.channelName;
            state.categoryId = action.payload.categoryId;
            state.categoryName = action.payload.categoryName;
        },
    },
});

export const { setChannelInfo } = appSlice.actions;

export const selectChannelId = (state) => state.app.channelId;
export const selectChannelName = (state) => state.app.channelName;
export const selectCategoryId = (state) => state.app.categoryId;
export const selectCategoryName = (state) => state.app.categoryName;

export default appSlice.reducer;