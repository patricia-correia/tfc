import { Router } from 'express';
import TeamsController from '../controllers/TeamsController';

const router = Router();
const teams = new TeamsController();

router.get('/teams', (req, res) => teams.getAllTeams(req, res));
router.get('/teams/:id', (req, res) => teams.getTeams(req, res));

export default router;
