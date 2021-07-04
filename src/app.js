const express = require("express");
require("./db/mongoose.js");
const RouteUser = require("./routers/users.js");
const RouteTask = require("./routers/tasks.js");

const app = express();

app.use(express.json());

app.use(RouteUser);
app.use(RouteTask);


module.exports = app;