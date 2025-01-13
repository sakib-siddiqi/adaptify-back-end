import PaymentService from "@/services/payment.service";

type Props = {
    params: Promise<{
        id: string
    }>
}
export async function PATCH(req: Request, props: Props) {
    try {
        const id = (await props?.params)?.id;
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