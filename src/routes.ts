import { Router } from "https://deno.land/x/oak/mod.ts";
import * as UserController from "./controllers/UserController.ts";

const router = new Router();

router
    .get("/users/", UserController.indexUsers)
    .post("/users/", UserController.storeUser)
    .get("/users/:id", UserController.indexUser)
    // .put("/users/:id", UserController.updateUser)
    // .post("/users/:id/delete", UserController.deleteUser)

export default router;