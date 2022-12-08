import Teams from '../models/TeamsModel';

const NOT_FOUND = 'Incorret email or password';

class TeamsService {
  constructor(private teams = Teams) { }

  async getAllTeams() {
    const team = await this.teams.findAll({});
    if (team === null) {
      return { status: 401, message: NOT_FOUND };
    }
    return { status: 200, message: team };
  }

  async getTeams(id: string) {
    const team = await this.teams.findOne({
      where: { id },
    });
    if (team === null) {
      return { status: 401, message: NOT_FOUND };
    }
    return { status: 200, message: team };
  }
}

export default TeamsService;
