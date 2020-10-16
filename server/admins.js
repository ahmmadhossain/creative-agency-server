module.exports = (app, adminCollection) => {
  app.post("/makeadmin", (req, res) => {
    adminCollection
      .insertOne(req.body)
      .then((result) => {
        return res.status(200).send(result.insertedCount > 0);
      })
      .catch((error) => res.status(404).send(false));
  });

  
  app.post("/isAdmin", (req, res) => {
    adminCollection
      .findOne({ email: req.body.email })
      .then((result) => {
        if (result) {
          return res.status(200).send(true);
        }
        return res.status(404).send(false);
      })
      .catch((error) => res.status(404).send(false));
  });
};
