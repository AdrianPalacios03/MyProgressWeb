import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface AuthState {
    authenticated: boolean
}

// Define the initial state using that type
const initialState: AuthState = {
    authenticated: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logIn: ( state, action: PayloadAction<boolean> ) => {
            state.authenticated = action.payload;
        },
    }
});

export const { logIn } = authSlice.actions;