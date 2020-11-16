//jshint esversion:6
require("dotenv").config();
const express = require("express");

const app = express();

const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
const path = require("path");

const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
const MongoDbStore = require("connect-mongo")(session);

//Database Connection
const url = "mongodb://localhost/pizzaDB";
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true , useUnifiedTopology: true, useFindAndModify: true})
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Database connection...");
}).catch(err => {
    console.log("Connection failed ...")
});

// session store
let mongoStore = new MongoDbStore({
                    mongooseConnection: connection,
                    collection: 'sessions'
                });

// Session Config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 12 } // 12 hours
}));

app.use(flash());

// Assets
app.use(express.static('public'));
app.use(express.json());

// Global MiddleWare
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

// set Template Engine
app.use(expressLayout);
app.set("views", path.join(__dirname + "/resources/views"));
app.set("view engine", "ejs");

require("./routes/web")(app);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});