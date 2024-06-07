import { container } from 'tsyringe';
import { AuthProviderInterface } from '../providers/Auth/AuthProviderInterface';
import { AuthProvider } from '../providers/Auth/AuthProvider';
import { CreateSessionService } from '../services/Session/CreateSessionService';
import { CreateUserService } from '../services/User/CreateUserService';

import { UserRepository } from '../repositories/User/UserRepository';
import { UserRepositoryInterface } from '../repositories/User/UserRepositoryInterface';
import { UpdateUserService } from '../services/User/UpdateUserService';
import { FindUserByIdService } from '../services/User/FindUserByIdService';

container.registerSingleton<AuthProviderInterface>('AuthProvider', AuthProvider);
container.registerSingleton<UserRepositoryInterface>('UserRepository', UserRepository);

container.resolve(CreateSessionService); 
container.resolve(CreateUserService); 
container.resolve(UpdateUserService); 
container.resolve(FindUserByIdService);

export default container;