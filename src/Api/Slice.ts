import type { RootState } from './Store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchTickets } from './FetchTickets';
import { propseTickets } from '../Types/Types';
import { createSelector } from '@reduxjs/toolkit';

const selectTickets = (state: RootState) => state.tickets;
export const getSelectedCompanies = createSelector(
    [selectTickets],
  (tickets) => tickets?.selectedCompanies || [] 
);


export interface TicketsParamsFetchState {
    limit: number;
    companyS: string;
    companyP: string;
    companyR: string;
    transfers0: string;
    transfers1: string;
    transfers2: string;
    transfers3: string;
    sortPrice: string;
    sortDuratuon: string;
    sortBy?: string;
    sortBySecondary?: string;
}

export interface TicketsState {
    listTickets: propseTickets[];
    error: string | null;
    status: "idle" | "loading" | "error";
    selectedCompanies: string[]; 
    selectedTransfers: number[];
    displayFilterMenu: boolean;
    btnFast: boolean;
    btnCheap: boolean;
    btnOptimal: boolean;
    paramsFetch: TicketsParamsFetchState;
}

const initialState: TicketsState = {
    listTickets: [],
    error: null,
    status: "idle",
    selectedCompanies: [], 
    selectedTransfers: [],
    displayFilterMenu: false,
    btnCheap: false,
    btnFast: true,
    btnOptimal: true,
    paramsFetch: {
        limit: 3,
        companyS: 'S7',
        companyP: 'Pobeda',
        companyR: 'Redwings',
        transfers0: 'Без пересадок',
        transfers1: '',
        transfers2: '',
        transfers3: '',
        sortPrice: '',
        sortDuratuon: '',
        sortBy: "price",
        sortBySecondary: "duration"
    },
};

export const ticketsSlice = createSlice({
    name: "tickets",
    initialState,
    reducers: {
        increaseLimit: (state) => {
            state.paramsFetch.limit += 3;
        },
        displayFilterMenu: (state) => {
            state.displayFilterMenu = !state.displayFilterMenu;
        },
        setCheckedTransfers: (state, action: PayloadAction<number[]>) => {
            state.selectedTransfers = action.payload;
        },
        setSelectedCompanies: (state, action: PayloadAction<string[]>) => { 
            state.selectedCompanies = action.payload; 
        },
        btnViewCheapReducer: (state) => {
            state.btnCheap = false;
            state.btnFast = true;
            state.btnOptimal = true;
            state.listTickets = [];
            state.paramsFetch.sortDuratuon = '';
            state.paramsFetch.sortPrice = 'price';
            state.paramsFetch.sortBy = "price";
            state.paramsFetch.sortBySecondary = "duration";
        },
        btnViewFastReducer: (state) => {
            state.btnCheap = true;
            state.btnFast = false;
            state.btnOptimal = true;
            state.listTickets = [];
            state.paramsFetch.sortPrice = '';
            state.paramsFetch.sortDuratuon = 'duration';
            state.paramsFetch.sortBy = "duration";
            state.paramsFetch.sortBySecondary = "price";
        },
        btnViewOptimalReducer: (state) => {
            state.btnCheap = true;
            state.btnFast = true;
            state.btnOptimal = false;
            state.listTickets = [];
            state.paramsFetch.sortPrice = 'price';
            state.paramsFetch.sortDuratuon = 'duration';
            state.paramsFetch.sortBy = "transfers";
            state.paramsFetch.sortBySecondary = "price";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTickets.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchTickets.fulfilled,
                (state, { payload }) => {
                    state.listTickets = payload;
                    state.status = "idle";
                })
            .addCase(fetchTickets.rejected,
                (state, { payload }) => {
                    if (payload) state.error = payload.message;
                    state.status = "idle";
                });
    },
});


export const {
    displayFilterMenu,
    setCheckedTransfers,
    setSelectedCompanies, 
    btnViewCheapReducer,
    btnViewFastReducer,
    btnViewOptimalReducer,
    increaseLimit,
} = ticketsSlice.actions;

export const selectStatus = (state: RootState) => state.tickets.status;
export const selectListTickets = (state: RootState) => state.tickets.listTickets;
export const selectSelectedTransfers = (state: RootState) => state.tickets.selectedTransfers;
export const selectSelectedCompanies = (state: RootState) => state.tickets.selectedCompanies;
export const selectStateBtnCheap = (state: RootState) => state.tickets.btnCheap;
export const selectStateBtnFast = (state: RootState) => state.tickets.btnFast;
export const selectStateOptimal = (state: RootState) => state.tickets.btnOptimal;
export const selectStateParams = (state: RootState) => state.tickets.paramsFetch;
export const selectStateDisplayFilter = (state: RootState) => state.tickets.displayFilterMenu;

export default ticketsSlice.reducer;