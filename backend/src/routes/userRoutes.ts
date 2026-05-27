import { Router } from "express";
import { UserController } from "../controllers/userController";

const router = Router();
const userController = new UserController();

router.post("/users", userController.register);
router.post("/users/login", userController.login);

export default router;