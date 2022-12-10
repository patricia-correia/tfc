import * as express from 'express';
import login from './login';
import teams from './teams';
import matches from './matches';

const router = express.Router();
router.use(login);
router.use(teams);
router.use(matches);

export default router;
