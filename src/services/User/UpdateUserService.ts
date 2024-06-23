import { inject, injectable } from 'tsyringe';
import { UserRepositoryInterface } from '../../repositories/UserRepositoryInterface';
import bcrypt from 'bcrypt';
import { HASH_SALT } from '../../../constants/password_config';
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
    id: number;
} 

@injectable()
class UpdateUserService {

    constructor(@inject('UserRepository') private userRepository: UserRepositoryInterface) {}
    async execute(id: number, data: PayloadUser): Promise<DataUser> {
        const existUser = await this.userRepository.findUserById(+id);

        if(!existUser) {
            throw new Error('Usuário não encontrado');
        }

        const user = await this.userRepository.update(id, {
            ...data,
            password: await bcrypt.hash('12345678', HASH_SALT),
        });
        
        return {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            years: user.years,
            role_id: user.role_id,
            email: user.email,
            image: user.image,
        };
    }
}

export { UpdateUserService};