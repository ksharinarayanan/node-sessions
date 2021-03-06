const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/authSystem");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();
const connection = mongoose.connection;

mongoose.connect("mongodb://localhost:27017/users", {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true});
connection.once("open", () => {
    console.log("Mongo DB connection established!");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({secret: "thisismysecret", resave: false, saveUninitialized: false}))

app.set("view engine", "ejs");

app.use(authRouter);

app.listen(3000);