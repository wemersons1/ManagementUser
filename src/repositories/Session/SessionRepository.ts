import { SessionRepositoryInterface } from "./SessionRepositoryInterface";

class SessionRepository implements SessionRepositoryInterface {
    async create(data: object) {
        return data;
    }
}

export { SessionRepository };