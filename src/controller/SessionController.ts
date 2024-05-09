import { Request, Response } from "express";
import container from '../config/container';
import { SessionService } from "../services/Session/SessionService";
import { sign } from 'jsonwebtoken';
class SessionController {
    constructor() {
        
    }

    async store(req: Request, res: Response) {
        const { email, password } = req.body;

        const token = await container.resolve(SessionService)
                                    .create({email, password});

        if(token) {
            res.json(token);
        }

        res.status(401)
            .json({
                message: "Usuário ou senha inválidos"
            });
    }
}

export { SessionController }