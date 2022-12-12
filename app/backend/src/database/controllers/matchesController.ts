import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';

export default class MatchesController {
  static async allMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (inProgress) {
      const message = await MatchesService.inProgress(inProgress === 'true');

      return res.status(200).json(message);
    }

    const message = await MatchesService.allMatches();

    return res.status(200).json(message);
  }

  static async createMatch(req: Request, res: Response) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    const info = { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true };

    const newMatch = await MatchesService.createMatch(info);

    return res.status(201).json(newMatch);
  }

  static async finishMatch(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);

    const { message } = await MatchesService.finishMatch(id);

    return res.status(200).json({ message });
  }

  static async updateMatch(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const { message } = await MatchesService.updateMatch(id, { homeTeamGoals, awayTeamGoals });

    return res.status(200).json({ message });
  }
}
