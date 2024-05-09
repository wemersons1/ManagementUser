import { container } from 'tsyringe';
import { SessionRepositoryInterface } from '../repositories/Session/SessionRepositoryInterface';
import { SessionRepository } from '../repositories/Session/SessionRepository';
import { SessionService } from '../services/Session/SessionService';

container.registerSingleton<SessionRepositoryInterface>('SessionRepository', SessionRepository);
container.resolve(SessionService); 

export default container;