import { inject, injectable } from 'tsyringe';
import { UserRepositoryInterface } from '../../repositories/User/UserRepositoryInterface';


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

@injectable()
class UpdateUserService {

    constructor(@inject('UserRepository') private userRepository: UserRepositoryInterface) {}
    async execute(id: number, data: PayloadUser): Promise<DataUser> {
        return await this.userRepository.update(id, data);
    }
}

export { UpdateUserService};