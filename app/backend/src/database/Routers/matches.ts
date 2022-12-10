import { Router } from 'express';
import MatchesController from '../controllers/matchesController';

const router = Router();

router.get('/matches', MatchesController.allMatches);

export default router;
