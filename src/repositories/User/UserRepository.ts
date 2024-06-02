import dbClient from "../../dbClient";
import { UserRepositoryInterface } from "./UserRepositoryInterface";

interface PayloadUser {
    first_name: string;
    last_name: string;
    birth_day: Date;
    role_id: number;
    email: string;
    password: string;
} 
interface DataUser {
    first_name: string;
    last_name: string;
    birth_day: Date;
    role_id: number;
    email: string;
} 
class UserRepository implements UserRepositoryInterface{
    async create(data: PayloadUser): Promise<DataUser> {
        const userCreated = await dbClient.user.create({
            data
        });

        return this.userFormated(userCreated); 
    }

    // async update(data: PayloadUser): DataUser {

    // }
    
    // async get(id: number): DataUser {

    // }
    
    // async list(): Array<DataUser> {

    // }
    
    // async delete(id: number): void {

    // }

    private userFormated(userCreated) {
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
}

export { UserRepository };