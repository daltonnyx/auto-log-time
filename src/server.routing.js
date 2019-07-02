import { Router } from 'express';
import homeController from './controllers/home.controller';
import profileController from './controllers/profile.controller';
export default () => {
    const routes = Router();
    routes.get('/', homeController.index);
    routes.get('/profiles', profileController.index);
    return routes;
}