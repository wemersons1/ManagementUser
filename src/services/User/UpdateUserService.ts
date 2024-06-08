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
    years: string;
    role_id: number;
    email: string;
} 

@injectable()
class UpdateUserService {

    constructor(@inject('UserRepository') private userRepository: UserRepositoryInterface) {}
    async execute(id: number, data: PayloadUser): Promise<DataUser> {
        const user = await this.userRepository.update(id, data);
        
        return {
            first_name: user.first_name,
            last_name: user.last_name,
            years: user.years,
            role_id: user.role_id,
            email: user.email
        };
    }
}

export { UpdateUserService};