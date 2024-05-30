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
        
    }
}

export { SessionRepository };