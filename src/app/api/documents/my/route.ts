import { supabase } from "@/config/supabase.config";
import AuthService from "@/services/auth.service";
import DocumentService from "@/services/documents.service";
import { PostgrestError } from "@supabase/supabase-js";
import createHttpError from "http-errors";
import { any } from "next"
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const user = await AuthService.parseToken(req.headers.get('authorization') as string);
        if(!user?.id) throw createHttpError(401, "Only for authenticated user.")
        const data = await DocumentService.getMyDocument(user?.id)
        return Response.json({
            data: data
        })
    } catch (error: PostgrestError | any) {
        return Response.json({
            status: error?.status,
            message: error?.details||error.message,
        }, {
            status: error.status || 500
        })
    }
}