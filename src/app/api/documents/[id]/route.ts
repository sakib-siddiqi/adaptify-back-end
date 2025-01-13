import { supabase } from "@/config/supabase.config";
import DocumentService from "@/services/documents.service";
import { PostgrestError } from "@supabase/supabase-js";
import { PageConfig, } from "next"

export const config: PageConfig = {
    api: {
        bodyParser: {
            sizeLimit: '5mb',
        },
    },
    maxDuration: 10,
}
type Props = {
    params: {
        id: string;
    };
};

export async function GET(req: Request,  { params }: any) {
    const { id } = params;
    try {
        const data = await DocumentService.getById(String(id || ''));
        return Response.json({
            data: data
        })
    } catch (error: PostgrestError | any) {
        return Response.json({
            message: error.details || error.message,
        }, {
            status: 500
        })
    }
}
export async function PATCH(req: Request, { params }: any) {
    const { id } = params;
    try {
        const body = await req.json();
        const updateData: { [key: string]: string } = {};
        if (body?.status) updateData.status = body.status;
        const data = await DocumentService.updateOne(String(id), updateData);
        return Response.json({
            data: data,
            body: body,
            updateData
        })
    } catch (error: PostgrestError | any) {
        return Response.json({
            message: error.details || error.message,
        }, {
            status: 500
        })
    }
}