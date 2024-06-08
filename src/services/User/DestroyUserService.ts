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
class DestroyUserService {

    constructor(@inject('UserRepository') private userRepository: UserRepositoryInterface) {}
   
    async execute(id: number): Promise<void> {
        try {
            await this.userRepository.delete(id);
        }catch(error) {
            throw new Error(error);
        }
    }
}

export { DestroyUserService};