import { Router, Request, Response } from "express";
import breeds from "./breeds";
import images from "./images";

const routes = Router();

routes.use("/breeds", breeds);
routes.use("/images", images);

export default routes;
