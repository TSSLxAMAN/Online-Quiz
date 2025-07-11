import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    access: localStorage.getItem('access') || null,
    refresh: localStorage.getItem('refresh') || null,
    isAuthenticated: !!localStorage.getItem('access'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { access, refresh } = action.payload;
            state.access = access;
            state.refresh = refresh;
            state.isAuthenticated = true;
            localStorage.setItem('access', access);
            localStorage.setItem('refresh', refresh);
        },
        logout: (state) => {
            state.access = null;
            state.refresh = null;
            state.isAuthenticated = false;
            localStorage.clear();
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
