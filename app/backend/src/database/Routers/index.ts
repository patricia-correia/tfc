import * as express from 'express';
import login from './login';
import teams from './teams';

const router = express.Router();
router.use(login);
router.use(teams);

export default router;
