import { Router } from 'express';
import verifyTokenMiddleware from '../middlewares/token';
import loginController from '../controllers/loginController';
import loginValidatedController from '../controllers/loginValidatedController';

const router = Router();

router.post('/login', loginController.login);
router.get(
  '/login/validate',
  verifyTokenMiddleware,
  (req, res) => loginValidatedController.execute(req, res),
);

export default router;
