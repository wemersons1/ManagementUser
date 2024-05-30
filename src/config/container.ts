import { container } from 'tsyringe';
import { SessionRepositoryInterface } from '../provider/Session/SessionProviderInterface';
import { SessionRepository } from '../provider/Session/SessionProvider';
import { SessionService } from '../services/Session/CreateSessionService';

container.registerSingleton<SessionRepositoryInterface>('SessionRepository', SessionRepository);
container.resolve(SessionService); 

export default container;