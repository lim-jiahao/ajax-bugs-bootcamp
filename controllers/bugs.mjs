export default function initBugsController(db) {
  const getAllBugs = async (request, response) => {
    try {
      const bugs = await db.Bug.findAll({
        include: [db.Feature, db.User],
        order: [['id', 'ASC']],
      });
      response.send({ bugs });
    } catch (error) {
      console.log(error);
    }
  };

  const create = async (req, res) => {
    console.log(req.body);
    try {
      const feature = await db.Feature.findOne({ where: { name: req.body.feature } });
      const user = await db.User.findOne({ where: { name: req.body.username } });
      const item = await db.Bug.create({
        problem: req.body.problem,
        errorText: req.body.errorText,
        commit: req.body.commit,
        featureId: feature.id,
        userId: user.id,
      });
      res.send({ item, feature: req.body.feature });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  return {
    getAllBugs, create,
  };
}
