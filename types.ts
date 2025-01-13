export type Status = "PENDING" | "APPROVED" | "REJECTED";
export type PaymentStatus = Status & 'PAID';
export type Roles = "ADMIN" | "USER";

export interface Payment {
    id : number;
    title : string;
    amount : number;
    status : PaymentStatus;
    user_id : string;
    created_at : string;
}
export type PaymentFilter = Partial<Payment>;
export type PaymentCreate = Omit<Payment,'created_at'|'id'>;
export type PaymentUpdate = Partial<PaymentCreate>;