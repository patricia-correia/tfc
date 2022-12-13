import { Request, Response } from 'express';
import LeaderBoardService from '../services/learderBoardService';

export default class LeardBoardController {
  constructor(private _learderService = new LeaderBoardService()) {}
  public getAll = async (req: Request, res: Response) => {
    try {
      const matches = await this._learderService.leaderBoardHome(req.path);

      return res.status(200).json(matches);
    } catch (error) {
      return res.status(404).json({ message: 'deu ruim!' });
    }
  };
}
