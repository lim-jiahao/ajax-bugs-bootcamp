export default function initBugsController(db) {
  // const index = async (request, response) => {
  //   try {
  //     const items = await db.Item.findAll();
  //     response.send({ items });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const create = async (req, res) => {
    try {
      const item = await db.Bug.create({
        problem: req.body.problem,
        errorText: req.body.errorText,
        commit: req.body.commit,
      });
      res.send({ item });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  return {
    create,
  };
}
