import { compare } from "bcrypt";
import dbClient from "../../dbClient";
import { SessionProviderInterface } from "./SessionProviderInterface";
import { sign } from "jsonwebtoken";

interface SessionRequest {
    email: string;
    password: string;
}
class SessionProvider implements SessionProviderInterface {
    async create(data: SessionRequest) {
        
    }
}

export { SessionProvider };