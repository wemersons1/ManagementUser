import { inject, injectable } from 'tsyringe';
import { UserRepositoryInterface } from '../../repositories/UserRepositoryInterface';
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
class ListUserService {

    constructor(@inject('UserRepository') private userRepository: UserRepositoryInterface) {}

    async execute(): Promise<DataUser[]> {
        const users = await this.userRepository.list();

        return users.map(user => {
                return {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    years: user.years,
                    role_id: user.role_id,
                    email: user.email,
                    image: user.image,
                };
        });
    }
}

export { ListUserService }