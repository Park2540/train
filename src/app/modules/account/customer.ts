export interface Country {
    name?: string;
    code?: string;
}

export interface Representative {
    name?: string;
    image?: string;
}

export interface Customer {
    id?: number;
    name?: string;
    country?: Country;
    company?: string;
    date?: string;
    status?: string;
    activity?: number;
    representative?: Representative;
}
export interface PeriodicElement {
    position: number;
    name: string;
    system:string;
    level:string;
    problem:string;
    time:string;
    status:string;
    link:string;
  
  }
