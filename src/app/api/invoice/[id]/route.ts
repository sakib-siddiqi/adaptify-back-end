import PaymentService from '@/services/payment.service';
import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';



export async function GET(req:any, {params} : any) {
    try {
        const payment = await PaymentService.getPaymentByID(Number(params.id));
        if(!payment?.id) return;
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(`
            <style>
            td{
                padding:5px 10px;
                border: 0.5px solid;
            }
            </style>
        <table style="width:100%;">
            <tbody>
                <tr>
                    <td>Date</td>
                    <td>${new Date().toLocaleString()}</td>
                </tr>
                <tr>
                    <td>Payment ID </td>
                    <td>${payment?.id}</td>
                </tr>
                <tr>
                    <td>Title</td>
                    <td>${payment?.title}</td>
                </tr>
                <tr>
                    <td>Amount</td>
                    <td>${payment?.amount}</td>
                </tr>
                <tr>
                    <td>Currency</td>
                    <td>USD</td>
                </tr>
                <tr>
                    <td>Status</td>
                    <td>${payment?.status}</td>
                </tr>
            </tbody>
        </table>    
        `);
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
        });
        await browser.close();
        return new NextResponse(pdfBuffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'inline; filename="table.pdf"',
            },
        });
    } catch (error) {
        console.error('Error generating PDF:', error);
        return new NextResponse(
            JSON.stringify({ error: 'Failed to generate PDF' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
