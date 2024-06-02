import { inject, injectable } from 'tsyringe';
import { UserRepositoryInterface } from '../../repositories/User/UserRepositoryInterface';


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

@injectable()
class CreateUserService {

    constructor(@inject('UserRepository') private userRepository: UserRepositoryInterface) {}
    async execute(data: PayloadUser): Promise<DataUser> {
        return await this.userRepository.create(data);
    }
}

export { CreateUserService};