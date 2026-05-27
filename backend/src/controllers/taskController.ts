import { Request, Response } from 'express';

import { prisma } from '../database/prisma'

export class TaskController {
    async create(req: Request, res: Response) {
        const { title, description} = req.body;

        if(!title || !description) {
            return res.status(400).json({ message: 'Título e descrição são obrigatórios' });
        }

        try {
            const task = await prisma.task.create({
                data: {
                    title,
                    description,
                    userId: req.userId
                },
            });
            
            return res.status(201).json(task);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao criar tarefa'
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
            return res.status(500).json({ message: 'Erro ao listar tarefas' });
        }
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const task = await prisma.task.findUnique({
                where: {
                    id: String(id),
                },
            });

            if (!task || task.userId !== req.userId) {
                return res.status(404).json({ message: 'Tarefa não encontrada' });
            }

            await prisma.task.delete({
                where: {
                    id: String(id),
                },
            });

            return res.status(200).json({ message: 'Tarefa deletada com sucesso' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao deletar tarefa' });
        }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { title, description } = req.body;

        try {
            const task = await prisma.task.findUnique({
                where: {
                    id: String(id),
                },
            });

            if(!task || task.userId !== req.userId) {
                return res.status(404).json({ message: 'Tarefa não encontrada' });
            }

            const updatedTask = await prisma.task.update({
                where: {
                    id: String(id),
                },
                data: {
                    title,
                    description,
                }
            });

            return res.json(updatedTask);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao atualizar tarefa' });
        }
    }
}