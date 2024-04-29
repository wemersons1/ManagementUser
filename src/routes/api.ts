import { Router } from 'express';
import { SessionController } from '../controller/SessionController';

const router = Router();

router.post('/login', new SessionController().store);

export { router }