export const Status ={
    PENDING: "PENDING",
    PROCESSING: "PROCESSING",
    COMPLETED: "COMPLETED",
    FAILED: "FAILED"
} as const;

export type Status = typeof Status[keyof typeof Status];

export interface Order{
    id: number;
    name: string;
    price: number;
    status: Status;
}
