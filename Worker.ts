export const Wstatus = {
    BUSY : "BUSY" ,
    IDLE : "IDLE"
}as const ;
export type Wstatus = typeof Wstatus[keyof typeof Wstatus];
export interface Worker{
    name: string ,
    status : Wstatus ,
}