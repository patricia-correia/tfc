import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import IToken from '../interfaces/tokenInterface';

const secret: string = process.env.JWT_SECRET || 'jwt_secret';

class Token {
  static generated(data: object): string {
    const configJWT: object = {
      expiresIn: '1d',
      algorithm: 'HS256',
    };
    const createToken: string = jwt.sign(data, secret, configJWT);
    return createToken;
  }

  static validateToken(token: string) {
    const validate = jwt.verify(token, secret);
    return validate as IToken;
  }
}
export default Token;
