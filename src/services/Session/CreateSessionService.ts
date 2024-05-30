import { inject, injectable } from 'tsyringe';
import { SessionRepositoryInterface } from "../../repositories/Session/SessionRepositoryInterface";
interface SessionInterface {
    email: string;
    password: string;
}

@injectable()
class CreateSessionService {
    constructor(@inject('SessionRepository') private sessionRepository: SessionRepositoryInterface) {}

    async execute(data: SessionInterface) {
        const { email, password } = data;
        
        //INJETAR O USER REPOSITORY
        const user = await dbClient.user.findFirst({
            where: {
                email
            }
        });

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

        return {
            token
        };
        
    }   
}

export { CreateSessionService };