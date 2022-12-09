import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

const secret: string = process.env.JWT_SECRET || 'jwt_secret';

export default class Token {
  static generated(data: object): string {
    const configJWT: object = {
      expiresIn: '1d',
      algorithm: 'HS256',
    };
    const createToken: string = jwt.sign(data, secret, configJWT);
    return createToken;
  }
}
