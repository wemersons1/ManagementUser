import { Router } from 'express';
import { SessionController } from '../controller/SessionController';
import { StoreSessionRequest, rulesStoreSessionRequest } from '../validators/requests/session/SessionStoreRequest';
import { verifyIfIsAuthenticated } from '../middlewares/VerifyIfIsAuthenticate';

const router = Router();

router.post('/login', rulesStoreSessionRequest, new StoreSessionRequest().handle, new SessionController().store);
// router.post('/users', verifyIfIsAuthenticated, validateSessionStore, new SessionController().store);

export { router }