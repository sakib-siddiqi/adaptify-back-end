import { supabase } from "@/config/supabase.config";
import { PaymentCreate, PaymentUpdate, Payment, PaymentFilter } from "../../types";

export default class PaymentService {
    static table = "payments";
    static DB = supabase.from(PaymentService.table);
    static async createPayment(data: PaymentCreate) {
        const result = await PaymentService.DB.insert(data);
        if (result.error) throw result.error;
        return result.data;
    }
    static async updatePayment(id: Payment['id'], data: PaymentUpdate) {
        const result = await PaymentService.DB.update(data).eq('id', id);
        if (result.error) throw result.error;
        return result.data;
    }
    static async deletePayment(id: Payment['id']) {
        const result = await PaymentService.DB.delete().eq('id', id);
        if (result.error) throw result.error;
        return result.data;
    }
    static async getPayments(props?: { page?: number, limit?: number, filter?: PaymentFilter }) {
        const query = PaymentService.DB.select("*").order('created_at', { ascending: false });
        if (props?.filter) {
            Object.entries(props?.filter).forEach(([key, value]) => {
                query.filter(key, 'eq', value);
            })
        }
        const result = await query;
        if (result.error) throw result.error;
        return {
            data: result.data,
            count: result.count,
        };
    }
    static async getPaymentByID(id: Payment['id']) {
        const result = await PaymentService.DB.select("*").eq('id', id).single();
        if (result.error) throw result.error;
        return result.data;
    }
}