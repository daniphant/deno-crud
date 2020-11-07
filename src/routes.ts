import { Router } from "https://deno.land/x/oak/mod.ts";
import * as UserController from "./controllers/UserController.ts";

const router = new Router();

router.get("/users/", UserController.indexUsers)
router.post("/users/", UserController.storeUser)
router.get("/users/:id", UserController.indexUser)
router.put("/users/:id", UserController.updateUser)
router.post("/users/:id/delete", UserController.deleteUser)

export default router;