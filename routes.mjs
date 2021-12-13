import db from './models/index.mjs';

// import your controllers here
import initBugsController from './controllers/bugs.mjs';

export default function bindRoutes(app) {
  // initialize the controller functions here
  const BugsController = initBugsController(db);

  // pass in the db for all callbacks
  app.post('/bug', BugsController.create);

  // define your route matchers here using app
  app.get('/', (req, res) => res.render('index'));
}
