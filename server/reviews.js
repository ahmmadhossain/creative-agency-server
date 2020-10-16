module.exports = (app, reviewCollection) => {
  app.post("/addreview", (req, res) => {
    reviewCollection
      .insertOne(req.body)
      .then((result) => res.status(200).send(result.insertedCount > 0))
      .catch((error) => res.status(404).send(false));
  });

  app.get("/allreviews", (req, res) => {
    reviewCollection.find({}).toArray((err, documents) => {
      res.status(200).send(documents);
    });
  });
};
