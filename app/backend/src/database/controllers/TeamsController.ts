import { Request, Response } from 'express';
import TeamsService from '../services/teamsService';

class TeamsController {
  constructor(private teams = new TeamsService()) { }

  async getAllTeams(_req: Request, res: Response) {
    const { status, message } = await this.teams.getAllTeams();
    if (status !== 200) {
      return res.status(status).json(message);
    }
    return res.status(status).json(message);
  }

  async getTeams(req: Request, res: Response) {
    const { id } = req.params;
    const { status, message } = await this.teams.getTeams(id);
    if (status !== 200) {
      return res.status(status).json({ message });
    }
    return res.status(status).json(message);
  }
}

export default TeamsController;
