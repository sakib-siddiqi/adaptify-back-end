import { supabase } from "@/config/supabase.config";
import DocumentService from "@/services/documents.service";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const document = searchParams.get('document');
        const documentUrl = DocumentService.documentUrl(document as string);
        return Response.redirect(documentUrl.data.publicUrl);
    } catch (error: any) {
        return Response.json({
            message: error?.message
        }, {
            status: 500
        })
    }
};