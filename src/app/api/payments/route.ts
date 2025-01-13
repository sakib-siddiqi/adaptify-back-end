import PaymentService from "@/services/payment.service";
import { NextRequest } from "next/server";
import { PaymentFilter, PaymentStatus, Status } from "../../../../types";
import AuthService from "@/services/auth.service";
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const page = Number(searchParams.get('page')) || 1;
        const limit = Number(searchParams.get('limit')) || 50;
        const status = Number(searchParams.get('status'));
        const user = await AuthService.parseToken(req.headers.get('authorization') as string);
        const filter: PaymentFilter = {};
        if (user?.role === 'USER') filter.user_id = user.id;
        if (status) filter.status = status as PaymentStatus;
        console.log({filter})
        const result = await PaymentService.getPayments({
            page,
            limit,
            filter: filter
        });
        return Response.json(result);
    } catch (error: any) {
        return Response.json({
            message: error?.message
        }, {
            status: 500
        })
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const user = await AuthService.parseToken(req.headers.get('authorization') as string);
        if (user?.id && user.role!=="ADMIN") body.user_id = user.id;
        const result = await PaymentService.createPayment(body);
        return Response.json(result);
    } catch (error: any) {
        return Response.json({
            message: error?.message
        }, {
            status: 500
        })
    }
}