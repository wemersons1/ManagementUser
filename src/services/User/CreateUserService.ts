import { inject, injectable } from 'tsyringe';
import { UserRepositoryInterface } from '../../repositories/User/UserRepositoryInterface';
import { FindUserByEmailService } from './FindUserByEmailService';

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
class CreateUserService {

    constructor(@inject('UserRepository') private userRepository: UserRepositoryInterface) {}
    async execute(data: PayloadUser): Promise<DataUser> {
        const { email } = data;
        
        const findUserByEmailService = new FindUserByEmailService();
        
        const user = await findUserByEmailService.execute(email);

        if(user) {
            throw new Error('Usuário já cadastrado');
        }
        
        return await this.userRepository.create(data);
    }
}

export { CreateUserService};