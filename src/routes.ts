import { Router } from "https://deno.land/x/oak/mod.ts";
import * as UserController from "./controllers/UserController.ts";
import authMiddleware from "./middlewares/auth.ts";

const router = new Router();

// Auth and store routes
router
    .post("/users/auth", UserController.authenticateUser)
    .post("/users", UserController.storeUser)
    .get("/users", UserController.indexUsers)


// Token middleware
router.use(authMiddleware)

// "Application" routes
router
    .get("/user/", UserController.indexUser)
    .put("/user/", UserController.updateUser)
    .delete("/user/", UserController.deleteUser)

export default router;