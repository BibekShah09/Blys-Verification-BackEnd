import { Router } from 'express';
import Route from '../interfaces/routes.interface';
import CodeController from '../controllers/code.controller';
import codeVerificationRequestValidator from '../validators/code.validator';

class CodeRoute implements Route {
  public path = '/code-verification';
  public router = Router();
  public codeController = new CodeController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, codeVerificationRequestValidator, this.codeController.verify);
  }
}

export default CodeRoute;
