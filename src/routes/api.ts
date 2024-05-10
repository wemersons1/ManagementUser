import { Router, Request, Response } from 'express';
import { SessionController } from '../controller/SessionController';
import { validateSessionStore } from '../validators/requests/session/SessionStoreRequest';
import { verifyIfIsAuthenticated } from '../middlewares/VerifyIfIsAuthenticate';

const router = Router();

router.post('/login', verifyIfIsAuthenticated, validateSessionStore, new SessionController().store);

export { router }