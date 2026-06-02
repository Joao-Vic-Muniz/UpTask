import { Router } from 'express';

import { TaskController } from '../controllers/taskController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

const taskController = new TaskController();

router.post("/", authMiddleware, taskController.create);
router.get("/", authMiddleware, taskController.list);
router.put("/:id", authMiddleware, taskController.update);
router.delete("/:id", authMiddleware, taskController.delete);

export default router;