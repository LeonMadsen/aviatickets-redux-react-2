import { ReactNode } from "react";

export type childrenProps = {  
    children: ReactNode;
}

export interface ticket { 
    id: number;
    from: string;
    to: string;
    company: string;
    price: number;
    currency: string;
    startTime: string;
    endTime: string;
    duration: number;
    date?: string;
    transfers: string;
}

export type company = {
    company: string;
}

export interface propseTickets { 
    id: number;
    from: string;
    to: string;
    price: number;
    company: string;
    currency: string;
    startTime: string;
    endTime: string;
    duration: number;
    transfers: string;
}

export type fetchTicketsError = {  
    message: string;
  };

  export type ticketsState = { 
    listTickets: ticket[];
    error: string | null;
    status: "loading" | "idle";
    btnCheap: Boolean;
    btnFast: Boolean;
    btnOptimal: Boolean;
    paramsFetch: paramsFetch;
    displayFilterMenu: boolean;
  };

  export interface paramsFetch {
    limit: number;
    companyP: string;
    companyR: string;
    companyS: string;
    transfers0: string; 
    transfers1: string;
    transfers2: string;
    transfers3: string;
    sortPrice: string;
    sortDuratuon: string;
  }
