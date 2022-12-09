import IToken from '../interfaces/tokenInterface';
import User from '../models/UserModel';

class loginValidatedService {
  static async execute(id: number) {
    const login = await User.findOne({ where: { id } }) as IToken;
    return { role: login.role };
  }
}

export default loginValidatedService;
