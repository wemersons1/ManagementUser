import dbClient from "../../dbClient";
import { UserRepositoryInterface } from "./UserRepositoryInterface";

interface PayloadUser {
    first_name: string;
    last_name: string;
    birth_day: string;
    role_id: number;
    email: string;
    password: string;
} 
interface DataUser {
    first_name: string;
    last_name: string;
    birth_day: string;
    role_id: number;
    email: string;
} 
class UserRepository implements UserRepositoryInterface{
    async create(data: PayloadUser): Promise<DataUser> {
        const userCreated = await dbClient.user.create({
            data
        });

        const {     
            first_name,
            last_name,
            birth_day,
            role_id,
            email 
        } = userCreated;

        return {
            first_name,
            last_name,
            birth_day,
            role_id,
            email
        }
    }

    async update(id: number, data: PayloadUser): Promise<DataUser> {
        const user = await dbClient.user.findFirst({
                where: {
                    id
                }
            });

        if(!user) {
            throw new Error('Usuário não encontrado');
        }

        const userUpdated =  await dbClient.user.update({
                                    where: {
                                        id
                                    },
                                    data
                                });
                            

        const {     
            first_name,
            last_name,
            birth_day,
            role_id,
            email 
        } = userUpdated;

        return {
            first_name,
            last_name,
            birth_day,
            role_id,
            email
        }
    }

    // async update(data: PayloadUser): DataUser {

    // }
    
    // async get(id: number): DataUser {

    // }
    
    // async list(): Array<DataUser> {

    // }
    
    // async delete(id: number): void {

    // }
}

export { UserRepository };