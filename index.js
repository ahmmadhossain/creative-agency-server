const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
require("dotenv").config();

const app = express();
const PORT = process.env.port || 5000;

const MongoClient = require("mongodb").MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mq04u.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());


client.connect((error) => {
  if (error) {
    console.log("Database connection error", error);
    return;
  }
  console.log("Database connected");
  const db = client.db(`${process.env.DB_NAME}`);

  const servicesCollection = db.collection("services");
  const adminsCollection = db.collection("admins");
  const reviewsCollection = db.collection("reviews");
  const ordersCollection = db.collection("orders");

  require("./server/services")(app, servicesCollection);
  require("./server/admins")(app, adminsCollection);
  require("./server/reviews")(app, reviewsCollection);
  require("./server/orders")(app, ordersCollection);
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT);
