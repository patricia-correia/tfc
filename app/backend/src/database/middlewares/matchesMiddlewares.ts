import { NextFunction, Request, Response } from 'express';
import Teams from '../models/TeamsModel';

async function matchMiddleware(req: Request, res: Response, next: NextFunction) {
  const { homeTeam, awayTeam } = req.body;

  if (homeTeam === awayTeam) {
    return res.status(422).json({
      message: 'It is not possible to create a match with two equal teams',
    });
  }

  const idHomeTeam = await Teams.findOne({ where: { id: homeTeam } });
  const idAwayTeam = await Teams.findOne({ where: { id: awayTeam } });

  if (!idHomeTeam || !idAwayTeam) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }

  next();
}

export default matchMiddleware;
