import PaymentService from "@/services/payment.service";


export async function PATCH(req: Request, {params}: any) {
    try {
        const id = params?.id;
        const body = await req.json();
        const result = await PaymentService.updatePayment(Number(id),body);
        return Response.json(result);
    } catch (error: any) {
        return Response.json({
            message: error?.message
        }, {
            status: 500
        })
    }
}