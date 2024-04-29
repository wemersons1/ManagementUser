import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import { SessionRepositoryInterface } from "../../repositories/Session/SessionRepositoryInterface";

interface SessionInterface {
    email: string;
    password: string;
}

@injectable()
class SessionService {
    constructor(@inject('SessionRepository') private sessionRepository: SessionRepositoryInterface) {

    }

    async create(data: SessionInterface) {
        return await this.sessionRepository.create(data);
    }   
}

export { SessionService };