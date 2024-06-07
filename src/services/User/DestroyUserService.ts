import { inject, injectable } from 'tsyringe';
import { UserRepositoryInterface } from '../../repositories/User/UserRepositoryInterface';
import { FindUserByEmailService } from './FindUserByEmailService';
import { FindUserByIdService } from './FindUserByIdService';

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
class DestroyUserService {

    constructor(@inject('UserRepository') private userRepository: UserRepositoryInterface) {}
    async execute(id: number): Promise<DataUser> {
        const findUserByIdService = new FindUserByIdService();
        
        const user = await findUserByIdService.execute(id);

        if(user) {
            throw new Error('Usuário já cadastrado');
        }
        
        return await this.userRepository.create(data);
    }
}

export { DestroyUserService};