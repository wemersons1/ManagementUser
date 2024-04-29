import { container } from 'tsyringe';
import { SessionRepositoryInterface } from '../repositories/Session/SessionRepositoryInterface';
import { SessionRepository } from '../repositories/Session/SessionRepository';

container.registerSingleton<SessionRepositoryInterface>('SessionRepository', SessionRepository);

export default container;