export default function initFeaturesController(db) {
  // const index = async (request, response) => {
  //   try {
  //     const items = await db.Item.findAll();
  //     response.send({ items });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getAllFeatures = async (req, res) => {
    try {
      const features = await db.Feature.findAll();
      res.send({ features });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  const create = async (req, res) => {
    try {
      const feature = await db.Feature.create({
        name: req.body.feature,
      });
      res.send({ feature });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  return {
    getAllFeatures, create,
  };
}
