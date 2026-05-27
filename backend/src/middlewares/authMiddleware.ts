import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
    id: string;
}

export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).json({
            error: 'Token de autenticação não fornecido',
        });
    }

    const [, token] = authToken.split(' ');

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        );

        const { id } = decoded as TokenPayload;

        req.userId = id;

        return next();
    } catch (error) {
        return res.status(401).json({
            error: 'Token de autenticação inválido',
        });
    }
}