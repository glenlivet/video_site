import express from "express";
import http from "http";
import path from "path";
import routes from "./routes";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import * as passportConfig from "./config/passport";
import passport from "passport";
import { IVerifyOptions } from "passport-local";

//config dotenv
dotenv.config();

// Express app initialization
export const app = express();

// Template configuration
app.set("view engine", "ejs");
app.set("views", "public");

// Static files configuration
app.use("/assets", express.static(path.join(__dirname, "frontend")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Security
app.use(passport.initialize());
app.use(passport.session());
app.post('/login',
  passport.authenticate('local', { failureRedirect: '/' }),
  function(req, res) {
    console.dir(req);
    res.redirect("/dashboard");
  }
)

app.use("/api", passportConfig.isAuthenticated, routes);

// Controllers
app.get("/*", (req, res) => {
  res.render("index");
});

// Start function
export const start = (port: number): Promise<void> => {
  const server = http.createServer(app);

  return new Promise<void>((resolve, reject) => {
    server.listen(port, resolve);
  });
};
