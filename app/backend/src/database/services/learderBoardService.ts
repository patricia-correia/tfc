import { QueryTypes } from 'sequelize';
import Teams from '../models/TeamsModel';
import Matches from '../models/MatchesModel';
import ILeaderBoard from '../interfaces/leaderbInterface';

export default class LeaderBoardService {
  constructor(private _matchesModel = Matches) {}
  public getAllLeader = async () => {
    const matches = await this._matchesModel.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  };

  public scoreBoard = (team: string, rival: string) => {
    const leardTeams = `SELECT teams.team_name as 'name',
      SUM(matches.in_progress = 0)  as 'totalGames',
      SUM(matches.${team}_team_goals > matches.${rival}_team_goals) as 'totalVictories',
      SUM(matches.${team}_team_goals = matches.${rival}_team_goals) as 'totalDraws',
      SUM(matches.${team}_team_goals < matches.${rival}_team_goals) as 'totalLosses',
      SUM(matches.${team}_team_goals) as 'goalsFavor',
      SUM(matches.${rival}_team_goals) as 'goalsOwn',
      SUM(matches.${team}_team_goals - matches.${rival}_team_goals) as 'goalsBalance'
      FROM matches 
      INNER JOIN teams ON teams.id = matches.${team}_team
      WHERE matches.in_progress = 0 
      GROUP BY teams.team_name;`;
    return leardTeams;
  };

  public leaderBoardHome = async (param: any) => {
    const search = param.split('/leaderboard/')[1];
    const query = this.scoreBoard(search, search === 'home' ? 'away' : 'home');
    const leardboard = await this._matchesModel.sequelize?.query(query, {
      type: QueryTypes.SELECT });
    const result = [] as ILeaderBoard[];
    leardboard?.forEach((element: ILeaderBoard | any, index) => {
      result.push(element);
      const score = (Number(element.totalVictories * 3) + Number(element.totalDraws));
      result[index].totalPoints = score;
      result[index].efficiency = Number((
        (score / (Number(element.totalGames) * 3)) * 100).toFixed(2));

      result.sort((a, b) => b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn);
    });
    return result;
  };
}
