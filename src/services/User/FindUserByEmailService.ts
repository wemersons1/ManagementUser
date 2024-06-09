import { inject } from 'tsyringe';
import { UserRepositoryInterface } from '../../repositories/User/UserRepositoryInterface';
interface DataUser {
    first_name: string;
    last_name: string;
    years: string;
    role_id: number;
    email: string;
} 
interface PayloadUser {
    first_name: string;
    last_name: string;
    birth_day: string;
    role_id: number;
    email: string;
    password: string;
    image: string;
}
class FindUserByEmailService {
    constructor(@inject('UserRepository') private userRepository: UserRepositoryInterface) {}

    async execute(email: string): Promise<DataUser> {

        return await this.userRepository.findUserByEmail(email);

    }
}

export { FindUserByEmailService }