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
class ListUserService {

    constructor(@inject('UserRepository') private userRepository: UserRepositoryInterface) {}

    async execute(): Promise<DataUser[]> {
        const users = await this.userRepository.list();

        return users.map(user => {
            return {
                first_name: user.first_name,
                last_name: user.last_name,
                years: user.years,
                role_id: user.role_id,
                email: user.email
            };
        });
    }
}

export { ListUserService }