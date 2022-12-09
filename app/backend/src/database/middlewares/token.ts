import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';

const secret: string = process.env.JWT_SECRET || 'jwt_secret';

function Token(req: Request, _res: Response, next: NextFunction) {
  const token = req.header('authorization');
  const { data } = jwt.verify(token as string, secret) as jwt.JwtPayload;

  req.body.user = data.userId;

  next();
}
export default Token;
