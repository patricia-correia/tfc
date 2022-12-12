import IToken from '../interfaces/tokenInterface';
import User from '../models/UserModel';

class loginValidatedService {
  static async execute(id: number) {
    const user = await User.findOne({ where: { id } }) as IToken;
    return { role: user.role };
  }
}

export default loginValidatedService;
