import { Router } from 'express';
// import verifyToken from '../middlewares/token';
import loginController from '../controllers/loginController';
/* import loginValidatedController from '../controllers/loginValidatedController';
 */
const router = Router();

router.post('/login', loginController.login);
/* router.get('/login/validate', verifyToken, (req, res) => loginValidatedController.execute(req, res)); */

export default router;
