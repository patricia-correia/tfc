import * as express from 'express';
import login from './login';
import teams from './teams';
import matches from './matches';
import leaderboard from './leaderboard';

const router = express.Router();
router.use(login);
router.use(teams);
router.use(matches);
router.use(leaderboard);

export default router;
