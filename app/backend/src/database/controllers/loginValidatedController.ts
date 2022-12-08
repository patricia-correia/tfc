import { Request, Response } from 'express';
import LoginValidatedService from '../services/loginValidatedService';

class loginValidatedController {
  static execute(req: Request, res: Response) {
    const token = req.header('authorization');
    const { type, message } = LoginValidatedService.execute(token);
    if (type) return res.status(200).json({ role: message });
  }
}

export default loginValidatedController;
