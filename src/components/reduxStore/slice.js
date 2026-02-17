import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: []
    totalUserCount: 0,
};

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.users.push(action.payload);
            state.totalUserCount = state.users.length;
        },
        setUsers: (state, action) => {
            state.users = action.payload;
            state.totalUserCount = state.users.length;
        },
        getTotalUserCount: (state) => {
            state.totalUserCount = state.users.length;
        },
    }
});

export const { getTotalUserCount, addUser, setUsers } = userSlice.actions;
export default userSlice.reducer;
