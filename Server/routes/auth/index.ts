import { Router } from 'express';
import loginRouter from './login';
import registerRouter from './register';
import accountRouter from './account';

const router = Router();

router.use('/', loginRouter);
router.use('/', registerRouter);
router.use('/', accountRouter);

export default router;
