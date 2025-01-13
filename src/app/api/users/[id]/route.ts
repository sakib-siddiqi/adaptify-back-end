import { supabase } from "@/config/supabase.config";
import { AuthError } from "@supabase/supabase-js";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server"

type Props = {
    params: {
        id: string
    }
}
export async function GET(request: NextRequest, props: Props) {
    try {
        const { data, error } = await supabase.auth.admin.getUserById(props?.params?.id)
        if (error) throw error;
        return Response.json({
            id: props?.params?.id,
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