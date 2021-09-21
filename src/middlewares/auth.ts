import { verify } from "https://deno.land/x/djwt/mod.ts"

export default async (ctx, next) => {
    const authHeader = ctx.request.headers.get("Authorization");
    const SECRET = Deno.env.get("TOKEN_SECRET") || "0";

    if(!authHeader) {
        ctx.response.status = 401
        ctx.response.body = {
            success: false,
            data: "No token provided."
        }
        return;
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2) {
        ctx.response.status = 401
        ctx.response.body = {
            success: false,
            data: "Token error."
        }
        return;
    }

    const [scheme, token] = parts;


    // Verifies if the scheme is formatted as Bearer
    if (!/^Bearer$/i.test(scheme)) {
        ctx.response.status = 401
        ctx.response.body = {
            success: false,
            data: "Token malformatted."
        }
        return;
    }

    try {
        const payload = await verify(token, SECRET, "HS512");
        ctx.request.token = payload;
    } catch (err) {
        console.log(err)
    } 

    await next();
}