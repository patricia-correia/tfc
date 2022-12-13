import { Router } from 'express';
import LeardBoardController from '../controllers/leardBoardController';

const router = Router();
const leaderBoard = new LeardBoardController();

router.get('/leaderboard/home', (req, res) => {
  leaderBoard.getAll(req, res);
});
router.get('/leaderboard/away', (req, res) => {
  leaderBoard.getAll(req, res);
});

export default router;
