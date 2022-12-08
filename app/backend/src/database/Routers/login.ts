import * as express from 'express';
import loginController from '../controllers/loginController';
import loginValidatedController from '../controllers/loginValidatedController';

const router = express.Router();

router.post('/login', loginController.login);
router.get('/login/validate', loginValidatedController.execute);

export default router;
