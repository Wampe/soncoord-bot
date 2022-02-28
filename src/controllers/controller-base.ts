import { Router } from 'express';
import { Controller } from '../interfaces/controller.interface';

export abstract class ControllerBase implements Controller {
	abstract controllerPath: string;
	abstract getRouter(): Router;
}