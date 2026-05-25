import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { prisma } from "../database/prisma";

export class UserController {
    async register(req: Request, res: Response) {
        const { name, email, password } = req.body;

        try {
            const userExists = await prisma.user.findUnique({
                where: {
                    email,
                },
            });

            if(userExists) {
                return res.status(400).json({
                    error: "Email já cadastrado",
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                },
            });

            return res.status(201).json(user);
        } catch (error) {
            return res.status(500).json({
                error: "Erro interno do servidor",
            });
        }
    }
}