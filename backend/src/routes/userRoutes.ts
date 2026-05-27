import { Router } from "express";

import { UserController } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

const userController = new UserController();

// cadastro
router.post("/register", userController.register);

// login
router.post("/login", userController.login);

// rota protegida
router.get("/profile", authMiddleware, (req, res) => {
  return res.json({
    message: "Usuário autenticado",
    userId: req.userId,
  });
});

export default router;