import { container } from 'tsyringe';
import { AuthProviderInterface } from '../providers/Auth/AuthProviderInterface';
import { AuthProvider } from '../providers/Auth/AuthProvider';
import { UserRepository } from '../repositories/User/UserRepository';
import { UserRepositoryInterface } from '../repositories/User/UserRepositoryInterface';

container.registerSingleton<AuthProviderInterface>('AuthProvider', AuthProvider);
container.registerSingleton<UserRepositoryInterface>('UserRepository', UserRepository);

export default container;