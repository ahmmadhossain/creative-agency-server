const ObjectId = require("mongodb").ObjectID;

module.exports = (app, servicesCollection) => {
  app.post("/addservice", (req, res) => {
    const iconFile = req.files.icon;
    const title = req.body.title;
    const description = req.body.description;
    const iconImageFile = iconFile.data;
    const encodedIconImage = iconImageFile.toString("base64");
    const iconImage = {
      contentType: iconFile.mimeType,
      size: iconFile.size,
      img: Buffer.from(encodedIconImage, "base64"),
    };

    servicesCollection
      .insertOne({ title, description, iconImage })
      .then((result) => {
        return res.status(200).send(result.insertedCount > 0);
      })
      .catch((error) => res.status(404).send(false));
  });

 
  app.get("/services", (req, res) => {
    servicesCollection.find({}).toArray((error, documents) => {
      if (!error) {
        return res.status(200).send(documents);
      }
    });
  });

  
  app.get("/service/:id", (req, res) => {
    const id = req.params.id;

    servicesCollection
      .findOne({ _id: ObjectId(id) })
      .then((service) => {
        if (service) {
          return res.status(200).send(service);
        }
        return res.send(null);
      })
      .catch((error) => res.status(404).send(false));
  });
};
