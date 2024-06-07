import { inject, injectable } from 'tsyringe';
import { UserRepositoryInterface } from '../../repositories/User/UserRepositoryInterface';
interface DataUser {
    first_name: string;
    last_name: string;
    years: string;
    role_id: number;
    email: string;
} 

@injectable()
class FindUserByIdService {

    constructor(@inject('UserRepository') private userRepository: UserRepositoryInterface) {}
    async execute(id: number) {
        return await this.userRepository.findUserById(id);
    }
}

export { FindUserByIdService }