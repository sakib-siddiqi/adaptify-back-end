import DocumentService from "@/services/documents.service";
import { NextApiRequest } from "next";

export async function GET(req: NextApiRequest) {
    try {
        const query = req.query;
        const page = Number(query?.page) || 1;
        const limit = Number(query?.limit) || 50;
        const result = await DocumentService.getAll({
            limit,
            page
        });
        return Response.json({
            data : result.data,
            meta : result.meta
        })
    } catch (error: any) {
        return Response.json({
            message: error?.message
        }, {
            status: 500
        })
    }
}