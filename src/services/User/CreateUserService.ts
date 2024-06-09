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
    image: string;
} 

@injectable()
class CreateUserService {

    constructor(@inject('UserRepository') private userRepository: UserRepositoryInterface) {}
    async execute(data: PayloadUser): Promise<DataUser> {
        const { email } = data;
  
        const existUser = await this.userRepository.findUserByEmail(email);
   
        if(existUser) {
            throw new Error('Usuário já cadastrado');
        }

        const user =  await this.userRepository.create(data);

        return {
            first_name: user.first_name,
            last_name: user.last_name,
            years: user.years,
            role_id: user.role_id,
            email: user.email,
            image: user.image
        };
    }
}

export { CreateUserService};