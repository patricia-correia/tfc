import { Router } from 'express';
import Token from '../middlewares/token';
import MatchesController from '../controllers/matchesController';
import matchMiddleware from '../middlewares/matchesMiddlewares';

const router = Router();

router.get('/matches', MatchesController.allMatches);
router.post('/matches', Token, matchMiddleware, (req, res) =>
  MatchesController.createMatch(req, res));
router.patch('/matches/:id', MatchesController.updateMatch);
router.patch('/matches/:id/finish', MatchesController.finishMatch);

export default router;
