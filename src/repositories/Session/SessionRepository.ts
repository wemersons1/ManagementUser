import { compare } from "bcrypt";
import dbClient from "../../dbClient";
import { SessionRepositoryInterface } from "./SessionRepositoryInterface";
import { sign } from "jsonwebtoken";

interface SessionRequest {
    email: string;
    password: string;
}
class SessionRepository implements SessionRepositoryInterface {
    async create(data: SessionRequest) {
        const { email, password } = data;
        
        const user = await dbClient.user.findFirst({
            where: {
                email
            }
        });

        if(user) {
            const userPassword = user.password as string;
            const passwordMatch = await compare(password, userPassword);
            
            if(passwordMatch) {
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

        return null;
    }
}

export { SessionRepository };