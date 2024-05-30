import { inject, injectable } from 'tsyringe';
import { SessionProviderInterface } from "../../provider/Session/SessionProviderInterface";
import { FindUserByEmailService } from '../User/FindUserByEmailService';
interface SessionInterface {
    email: string;
    password: string;
}

@injectable()
class CreateSessionService {
    constructor(@inject('SessionRepository') private sessionProvider: SessionProviderInterface) {}

    async execute(data: SessionInterface) {
        const { email, password } = data;
        
        const findUserByEmailService = new FindUserByEmailService();

        const user = await findUserByEmailService.execute(email);

        if(!user) {
            throw new Error('Usuário não encontrado');
        }

        const userPassword = user.password as string;
        //Criar provider pra isto
        const passwordMatch = await compare(password, userPassword);
        
        if(!passwordMatch) {
            throw new Error('Usuário ou senha inválido(s)');
        }

        //Criar provider pra isto
        const token = sign(
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