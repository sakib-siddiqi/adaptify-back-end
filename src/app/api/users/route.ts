import { supabase } from "@/config/supabase.config";
import { NextApiRequest } from "next";

export async function GET(req: NextApiRequest) {
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