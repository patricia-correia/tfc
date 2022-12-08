import { Request, Response } from 'express';
import LoginService from '../services/loginService';

class loginController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const validate = new LoginService(email, password);
    const { type, message, status } = await validate.validated();
    if (type) {
      return res.status(status).json({ message });
    }
    return res.status(status).json({ token: message });
  }
}

export default loginController;
