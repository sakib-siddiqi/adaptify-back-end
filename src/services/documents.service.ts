import { supabase } from "@/config/supabase.config";
import createHttpError from "http-errors";

interface DocumentsFilter {
    page: number,
    limit: number,
}

export default class DocumentService {
    static table = "documents";
    static bucket = "documents";
    static async getAll(props: DocumentsFilter) {
        const start = (props.page - 1) * props.limit;
        const end = start + (props.limit - 1);
        const result = await supabase
            .from(DocumentService.table)
            .select("*", { count: 'exact' })
            .range(start, end);
        if (result.error) throw result.error;
        return {
            data: result.data,
            meta: {
                page: props.page,
                pages: Math.ceil((result.count || 0) / props.limit),
                total: result?.count,
            }
        };
    }
    static async getById(id: string) {
        if (!id) throw createHttpError(403, 'Request with a document id.');
        const result = await supabase.from(DocumentService.table).select("*").eq('user_id', id).single();
        if (result.error) throw result.error;
        return result.data;
    }
    static async updateOne(id: string, data: any) {
        if (!id) throw createHttpError(403, 'Request with a document id.');
        const result = await supabase
            .from(DocumentService.table)
            .update(data)
            .eq('user_id', id);
        if (result.error) throw result.error;
        return result.data;
    }
    static async getMyDocument(id: string) {
        if (!id) throw createHttpError(403, 'Request with a document id.');
        const result = await supabase.from(DocumentService.table).select("*").eq('user_id', id).order('created_at', { ascending: false }).single();
        const document = await supabase.storage.from(DocumentService.bucket).getPublicUrl("kyc/222e9b7e-1070-4816-965b-234a5138c269.jpg");
        if (result.error) throw result.error;
        return {
            ...result.data,
            document: document.data.publicUrl
        };
    }

    static documentUrl(file : string) {
        return supabase.storage.from(DocumentService.bucket).getPublicUrl(file);
    }
}