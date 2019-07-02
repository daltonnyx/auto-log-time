import BaseController from './controller';

class ProfileController extends BaseController {
    constructor() {
        super();
    }

    index(req, res) {
        res.render('profile/index', {title: 'Log Time Profile'});
    }
}

export default new ProfileController();