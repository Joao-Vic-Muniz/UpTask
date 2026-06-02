import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";

import { prisma } from "../database/prisma";

import {
  registerSchema,
  loginSchema,
} from "../schemas/userSchema";

export class UserController {
  async register(req: Request, res: Response) {
    try {
      const validatedData = registerSchema.parse(req.body);

      const { name, email, password } = validatedData;

      const userExists = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (userExists) {
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

      return res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
      });

    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          errors: error.issues,
        });
      }

      return res.status(500).json({
        error: "Erro interno do servidor",
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const validatedData = loginSchema.parse(req.body);

      const { email, password } = validatedData;

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(400).json({
          error: "Email ou senha inválidos",
        });
      }

      const passwordMatch = await bcrypt.compare(
        password,
        user.password
      );

      if (!passwordMatch) {
        return res.status(400).json({
          error: "Email ou senha inválidos",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "7d",
        }
      );

      return res.json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token,
      });

    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          errors: error.issues,
        });
      }

      return res.status(500).json({
        error: "Erro interno do servidor",
      });
    }
  }

  async me(req: Request, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: req.userId,
        },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
      });

      if (!user) {
        return res.status(404).json({
          error: "Usuário não encontrado",
        });
      }

      return res.json(user);

    } catch (error) {
      return res.status(500).json({
        message: "Erro ao buscar usuário",
      });
    }
  }
}