import { inject, injectable } from 'tsyringe';
import { AuthProviderInterface } from "../../providers/Auth/AuthProviderInterface";
import { FindUserByEmailService } from '../User/FindUserByEmailService';
interface SessionInterface {
    email: string;
    password: string;
}

@injectable()
class CreateSessionService {
    constructor(@inject('AuthProvider') private authProvider: AuthProviderInterface) {}

    async execute(data: SessionInterface) {
        const { email, password } = data;
        
        const findUserByEmailService = new FindUserByEmailService();

        const user = await findUserByEmailService.execute(email);

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