import BaseController from './controller';

class HomeController extends BaseController {
    constructor() {
        super();
    }

    index(req, res) {
        res.render('home/index', {title: 'Auto Log Time'});
    }
}

export default new HomeController();