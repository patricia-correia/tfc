import * as bycrypt from 'bcryptjs';
import User from '../models/UserModel';
import Token from '../middlewares/token';

class loginService {
  private _email: string;
  private _password: string;

  constructor(email: string, password: string) {
    this._email = email;
    this._password = password;
  }

  async validated() {
    if (!this._email || !this._password) {
      return { type: 'invalid_email',
        status: 400,
        message: 'All fields must be filled' };
    }
    const validatedLogin = await User.findOne({ where: { email: this._email } });
    if (!validatedLogin) {
      return { type: 'invalide_email',
        status: 401,
        message: 'Incorrect email or password' };
    }
    const validatedPassword = await bycrypt.compare(this._password, validatedLogin.password);

    if (!validatedPassword) {
      return { type: 'invalid_password', status: 401, message: 'Incorrect email or password' };
    }

    const TokenGenerated = Token.generated({ data: { userId: validatedLogin.id } });
    return { type: null, status: 200, message: TokenGenerated };
  }
}

export default loginService;
