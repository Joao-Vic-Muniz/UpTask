import { Request, Response } from "express";
import { z } from "zod";

import { prisma } from "../database/prisma";

import { createTaskSchema, updateTaskSchema } from "../schemas/taskSchema";

export class TaskController {
  async create(req: Request, res: Response) {
    try {
      const validatedData = createTaskSchema.parse(req.body);

      const task = await prisma.task.create({
        data: {
          title: validatedData.title,
          description: validatedData.description,
          userId: req.userId,
        },
      });

      return res.status(201).json(task);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          errors: error.issues,
        });
      }

      console.error(error);

      return res.status(500).json({
        message: "Erro ao criar tarefa",
      });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const tasks = await prisma.task.findMany({
        where: {
          userId: req.userId,
        },
      });

      return res.json(tasks);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao listar tarefas" });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const task = await prisma.task.findFirst({
        where: {
          id: String(id),
          userId: req.userId,
        },
      });

      if (!task) {
        return res.status(404).json({
          error: "Tarefa não encontrada",
        });
      }

      await prisma.task.delete({
        where: {
          id: String(id),
        },
      });

      return res.json({
        message: "Tarefa removida com sucesso",
      });
    } catch (error) {
      return res.status(500).json({
        error: "Erro ao remover tarefa",
      });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const validatedData = updateTaskSchema.parse(req.body);

      const task = await prisma.task.findFirst({
        where: {
          id: String(id),
          userId: req.userId,
        },
      });

      if (!task) {
        return res.status(404).json({
          error: "Tarefa não encontrada",
        });
      }

      const updatedTask = await prisma.task.update({
        where: {
          id: String(id),
        },
        data: validatedData,
      });

      return res.json(updatedTask);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          errors: error.issues,
        });
      }

      return res.status(500).json({
        error: "Erro ao atualizar tarefa",
      });
    }
  }
}
