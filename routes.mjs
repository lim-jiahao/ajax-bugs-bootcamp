import db from './models/index.mjs';

// import your controllers here
import initBugsController from './controllers/bugs.mjs';
import initFeaturesController from './controllers/features.mjs';
import initUsersController from './controllers/users.mjs';

export default function bindRoutes(app) {
  // initialize the controller functions here
  const BugsController = initBugsController(db);
  const FeaturesController = initFeaturesController(db);
  const UsersController = initUsersController(db);

  // pass in the db for all callbacks
  app.get('/bug', BugsController.getAllBugs);
  app.post('/bug', BugsController.create);

  app.get('/feature', FeaturesController.getAllFeatures);
  app.post('/feature', FeaturesController.create);

  app.post('/login', UsersController.login);
  app.post('/register', UsersController.create);

  app.get('/logout', (req, res) => {
    res.clearCookie('username');
    res.clearCookie('loggedIn');
    res.send('success');
  });

  // define your route matchers here using app
  app.get('/', async (req, res) => res.render('index'));
}
