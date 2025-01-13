import { headers } from 'next/headers'
import { NextResponse, type MiddlewareConfig, type NextRequest } from 'next/server'
import AuthService from './services/auth.service';
import { supabase } from './config/supabase.config';
export async function middleware(request: NextRequest) {
  const headersList = await headers();
  const authorization = headersList.get('referer');
  try {
    const decode = await AuthService.parseToken(request.headers.get('authorization') as string);
    const newHeader = new Headers(request.headers);
    newHeader.set('x-user-email', (decode as any)?.sub);
    newHeader.set('x-user-email', (decode as any)?.email);
    return NextResponse.next({
      request: {
        headers: newHeader,
      },
    });
  } catch (error) {
    return;
  }
}
export const config: MiddlewareConfig = {
  matcher: [
    "/api/:path*",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ]
}