import { supabase } from "@/config/supabase.config";


export async function GET(req: any) {
    const query = req?.query;
    const page = Number(query?.page) || 1;
    const limit = Number(query?.limit) || 50;
    const data = await supabase.auth.admin.listUsers({ page: page, perPage: limit });
    return Response.json({
        data: data?.data?.users,
        meta: {
            page: (data?.data as any).lastPage,
            total: (data?.data as any).total,
        }
    })
}