import { Application } from "https://deno.land/x/oak/mod.ts";
import { killConnection } from "./db.ts";
import router from "./routes.ts";

const app = new Application();

const port = Number(Deno.env.get("PORT")) || 5000

app.use(router.routes())
app.use(router.allowedMethods())

console.log(`server running on port ${port}`)

await app.listen({port})
await killConnection();