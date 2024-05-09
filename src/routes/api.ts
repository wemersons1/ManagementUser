import { Router, Request, Response } from 'express';
import { SessionController } from '../controller/SessionController';
import { validateSessionStore } from '../validators/requests/session/SessionStoreRequest';

const router = Router();

router.post('/login', validateSessionStore(), new SessionController().store);

export { router }