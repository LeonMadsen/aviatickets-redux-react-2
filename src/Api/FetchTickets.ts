import { createAsyncThunk } from '@reduxjs/toolkit';
import { ticket, fetchTicketsError, paramsFetch } from '../Types/Types';

export const fetchTickets = createAsyncThunk<ticket[], paramsFetch, { rejectValue: fetchTicketsError }>("tickets/fetchTickets",
    async ({ limit, companyP, companyR, companyS, transfers0, transfers1, transfers2, transfers3, sortPrice, sortDuratuon }: paramsFetch, thunkApi) => { 
        const response = await fetch(`http://localhost:4000/tickets?_limit=${limit}&company=${companyP}&company=${companyR}&company=${companyS}&transfers=${transfers0}&transfers=${transfers1}&transfers=${transfers2}&transfers=${transfers3}&_sort=${sortPrice},${sortDuratuon}&_order=asc`);
        const data: ticket[] = await response.json();

        if (response.status !== 200) {
            return thunkApi.rejectWithValue({  
                message: "не удается установить соединение",
            });
        }
        return data; 
    });


