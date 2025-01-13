import { supabase } from "@/config/supabase.config";
import * as jose from 'jose'
import { Roles } from "../../types";
import createHttpError from "http-errors";

export default class AuthService {
    static async parseToken(token: string) {
        token = String(token || '').split("Bearer ")?.[1];
        if (!token) return;
        const decode = await jose.jwtVerify(token, new TextEncoder().encode(process.env.SUPABASE_JWT_KEY as any));
        return {
            id: decode.payload.sub,
            email: decode.payload.email,
            role: (decode.payload?.app_metadata as any)?.role || 'USER'
        };
    }
    static async updateRole(uid: string, role: Roles) {
        if (!uid) createHttpError(403, 'provide a user id.');
        const data = await supabase.auth.admin.updateUserById(uid, {
            app_metadata: {
                role: role
            }
        });
        if (data.error) throw data.error;
        return data.data.user;
    }
}