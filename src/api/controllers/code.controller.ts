import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import CodeService from '../services/code.service';

class CodeController {
  public tokenService = new CodeService();
  public verify = (req: Request, res: Response, next: NextFunction) => {
    try {
      const input: any = req.body;
      const data = this.tokenService.verify(input.code);

      res.status(StatusCodes.OK).json({ data });
    } catch (error) {
      next(error);
    }
  }
}

export default CodeController;
