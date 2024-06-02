import { Router } from 'express';
import { SessionController } from '../controller/SessionController';
import { StoreSessionRequest, rulesStoreSessionRequest } from '../validators/requests/session/SessionStoreRequest';
import { verifyIfIsAuthenticated } from '../middlewares/VerifyIfIsAuthenticate';
import { StoreUserRequest, rulesStoreUserRequest } from '../validators/requests/user/UserStoreRequest';
import { UserController } from '../controller/UserController';

const router = Router();

router.post('/login', rulesStoreSessionRequest, new StoreSessionRequest().handle, new SessionController().store);
router.post('/users', verifyIfIsAuthenticated, rulesStoreUserRequest, new StoreUserRequest().handle, new UserController().store);

export { router }