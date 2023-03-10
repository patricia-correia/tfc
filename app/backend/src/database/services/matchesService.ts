import Matches from '../models/MatchesModel';
import Teams from '../models/TeamsModel';

export default class MatchesService {
  static async allMatches() {
    const matches = await Matches.findAll({
      include: [{ model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] }] });

    return matches;
  }

  static async inProgress(inProgress: boolean) {
    const result = await Matches.findAll({
      where: { inProgress },
      include: [{ model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] }],
    });

    return result;
  }

  static async createMatch(info: object) {
    const newMatch = await Matches.create({ ...info });

    return newMatch;
  }

  static async finishMatch(id: number) {
    await Matches.update({ inProgress: false }, { where: { id } });

    return { message: 'Finished' };
  }

  static async updateMatch(id: number, info: object) {
    await Matches.update(info, { where: { id } });

    return { message: `Updated: ${info}` };
  }
}
