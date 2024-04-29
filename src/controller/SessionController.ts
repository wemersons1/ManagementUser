import { Request, Response } from "express"
import { SessionService } from "../services/Session/SessionService"
import container from "../config/container";

class SessionController {
    async store(req: Request, res: Response) {
        const { email, password } = req.body;

        const session = await container.resolve(SessionService).create({email, password});

        res.json(session);
    }
}

export { SessionController }