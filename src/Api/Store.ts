import { configureStore } from '@reduxjs/toolkit';
import { ticketsSlice } from './Slice';

export const store = configureStore({
    reducer: {
        tickets: ticketsSlice.reducer, 
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(), 
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;