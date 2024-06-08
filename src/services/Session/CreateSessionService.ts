import { inject, injectable } from 'tsyringe';
import { AuthProviderInterface } from "../../providers/Auth/AuthProviderInterface";
import { UserRepositoryInterface } from '../../repositories/User/UserRepositoryInterface';
interface SessionInterface {
    email: string;
    password: string;
}

@injectable()
class CreateSessionService {
    constructor(
        @inject('AuthProvider') private authProvider: AuthProviderInterface,
        @inject('UserRepository') private userRepository: UserRepositoryInterface,
) {}

    async execute(data: SessionInterface) {
        const { email, password } = data;

        const user = await this.userRepository.findUserByEmail(email);

        if(!user) {
            throw new Error('Usuário não encontrado');
        }

        const passwordMatch = await this.authProvider.comparePassword(password, user.password);
        
        if(!passwordMatch) {
            throw new Error('Usuário ou senha inválido(s)');
        }

        //Criar provider pra isto
        const token = this.authProvider.sign(
            {
                name: user.first_name,
                email: user.email
            },
            process.env.JWT_KEY,
            {
                expiresIn: '30d'
            }
        );

        return token;
    }   
}

export { CreateSessionService };