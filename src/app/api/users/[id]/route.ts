import { supabase } from "@/config/supabase.config";
import { AuthError } from "@supabase/supabase-js";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server"

export async function GET(request: NextRequest, {params}: any) {
    try {
        const { data, error } = await supabase.auth.admin.getUserById(params?.id)
        if (error) throw error;
        return Response.json({
            id: params?.id,
            data: data?.user,
        })
    } catch (error: AuthError | any) {
        return Response.json({
            status: error.status,
            code: error.code,
            message: error.message,
        }, {
            status: error.status
        })
    }
}