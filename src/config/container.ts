import { container } from 'tsyringe';
import { AuthProviderInterface } from '../providers/Auth/AuthProviderInterface';
import { AuthProvider } from '../providers/Auth/AuthProvider';
import { CreateSessionService } from '../services/Session/CreateSessionService';

container.registerSingleton<AuthProviderInterface>('AuthProvider', AuthProvider);
container.resolve(CreateSessionService); 

export default container;