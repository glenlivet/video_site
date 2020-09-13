import express from "express";
import http from "http";
import path from "path";
import routes from "./routes";

// Express app initialization
export const app = express();

// Template configuration
app.set("view engine", "ejs");
app.set("views", "public");

// Static files configuration
app.use("/assets", express.static(path.join(__dirname, "frontend")));

// Controllers
app.get("/", (req, res) => {
  res.render("index");
});

app.use("/api", routes);

// Start function
export const start = (port: number): Promise<void> => {
  const server = http.createServer(app);

  return new Promise<void>((resolve, reject) => {
    server.listen(port, resolve);
  });
};
