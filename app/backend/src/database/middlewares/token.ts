import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';

const secret: string = process.env.JWT_SECRET || 'jwt_secret';

function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header('authorization');
  // const { data } = jwt.verify(token as string, secret) as jwt.JwtPayload;

  try {
    const { data } = jwt.verify(token as string, secret) as jwt.JwtPayload;
    req.body.user = data.userId;

    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
}

export default verifyToken;
