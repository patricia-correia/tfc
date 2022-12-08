import Token from '../middlewares/token';

class loginValidatedService {
  static execute(token: string | undefined) {
    if (!token) {
      return { type: 404, message: 'token not found' };
    }
    const validate = Token.validateToken(token);

    if (!validate) {
      return { type: 404, message: 'invalid token' };
    }
    return { type: null, message: validate.role };
  }
}

export default loginValidatedService;
