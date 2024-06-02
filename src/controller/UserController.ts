import { Request, Response } from "express";
import container from '../config/container';
import { CreateUserService } from "../services/User/CreateUserService";

class UserController {
    async store(req: Request, res: Response) {
        const {   
            first_name,
            last_name,
            birth_day,
            role_id,
            email,
            password 
        } = req.body;

        const createUserService = await container.resolve(CreateUserService);
        
        return await createUserService.execute({
            first_name,
            last_name,
            birth_day,
            role_id,
            email,
            password 
        });
    }
}

export { UserController }