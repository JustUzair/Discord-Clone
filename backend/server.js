const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const http = require("http");
const cors = require("cors");
const authRouter = require("./routes/authRoutes");
const bodyParser = require("body-parser");
const helmet = require("helmet");
require("dotenv").config();
const PORT = process.env.PORT || process.env.LOCAL_PORT;
const errorController = require("./controllers/errorController");
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  encodeURIComponent(process.env.DATABASE_PASSWORD)
);

const app = express();

app.use(
  express.json({
    limit: "10kb", //req.body can contain only
  })
);
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false, limit: "10kb" }));

app.use("/api/auth", authRouter);
app.use(errorController);
// app.use(
//   helmet({
//     crossOriginEmbedderPolicy: false,
//     crossOriginResourcePolicy: {
//       allowOrigins: ["*"],
//     },
//     contentSecurityPolicy: {
//       directives: {
//         defaultSrc: ["*"], // default policy for fetching resources such as JavaScript, Images, CSS, Fonts etc
//         "img-src": ["* data: 'unsafe-eval' 'unsafe-inline' blob:"], //defines valid source of images
//         scriptSrc: ["* data: 'unsafe-eval' 'unsafe-inline' blob:"], // defines valid source of scripts
//       },
//     },
//   })
// );

mongoose.connect(DB).then(con => {
  console.log("Database Connected!!");
});

const server = app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}`);
});
