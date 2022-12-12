import { Request, Response } from 'express';
import LoginValidatedService from '../services/loginValidatedService';

class loginValidatedController {
  static async execute(req: Request, res: Response) {
    const id: number = req.body.login;
    const { role } = await LoginValidatedService.execute(id);

    return res.status(200).json({ role });
  }
}

export default loginValidatedController;
