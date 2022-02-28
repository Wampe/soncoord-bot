import { Router } from 'express';

export interface Controller {
	controllerPath: string;
	getRouter(): Router;
}
