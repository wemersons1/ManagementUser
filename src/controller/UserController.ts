import { Request, Response } from "express";
import container from '../config/container';
import { CreateUserService } from "../services/User/CreateUserService";
import { UpdateUserService } from "../services/User/UpdateUserService";
import { FindUserByIdService } from "../services/User/FindUserByIdService";
import { DestroyUserService } from "../services/User/DestroyUserService";
import { ListUserService } from "../services/User/ListUserService";
import { UpdateImageUserService } from "../services/User/UpdateImageUserService";

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

        const createUserService = container.resolve(CreateUserService);

        const userCreated = await createUserService.execute({
            first_name,
            last_name,
            birth_day,
            role_id,
            email,
            password 
        });

        res.status(201).json(userCreated);
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;

        const {   
            first_name,
            last_name,
            birth_day,
            role_id,
            email,
            password 
        } = req.body;

        const updateUserService = container.resolve(UpdateUserService);

        const userUpdated = await updateUserService.execute(+id, {
            first_name,
            last_name,
            birth_day,
            role_id,
            email,
            password 
        });

        res.json(userUpdated);
    }

    async show(req: Request, res: Response) {
        const { id } = req.params;

        const findUserByIdService = container.resolve(FindUserByIdService);
        
        const user = await findUserByIdService.execute(+id);

        res.json(user);
    }

    async destroy(req: Request, res: Response) {
        const { id } = req.params;

        const destroyUserService = container.resolve(DestroyUserService);
        
        await destroyUserService.execute(+id);

        res.status(204).json();
    }

    async index(req: Request, res: Response) {
        const listUserService = container.resolve(ListUserService);

        const users = await listUserService.execute();

        res.json(users);
    }

    async updateImage(req: Request, res: Response) {
        let image = null;
        if(typeof req.file != 'undefined') {
            const { filename } = req.file;
            image = filename;
        }
        
        const updateImageUserService = container.resolve(UpdateImageUserService);
        const filename = req.query.filename as string;
        const { id } = req.params;
        const data = {
            image
        };

        const userImage = await updateImageUserService.execute(+id, data);

        return res.send(userImage);
    }
}

export { UserController }