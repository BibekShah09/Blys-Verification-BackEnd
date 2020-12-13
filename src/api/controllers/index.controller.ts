import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';

class IndexController {
  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.sendStatus(StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  }
}

export default IndexController;
