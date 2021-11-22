import { NextFunction, Request, Response } from 'express';

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    return next();
}

export default authenticate;