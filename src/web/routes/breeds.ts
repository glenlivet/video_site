import { Router } from "express";
import { BreedService } from "../services";
import { BreedJSON } from "../models";
import { ApiIncompatibleException } from "../exceptions";

const router = Router();

//Get all breeds
router.get("/", (req, res) => {
  const breedService: BreedService = new BreedService();
  breedService
    .listAll()
    .then((data: BreedJSON[]) => {
      res.json(data);
    })
    .catch((err: Error) => {
      console.log(err.message);
      if (err instanceof ApiIncompatibleException) {
        console.error("ApiIncompatibleException encountered!");
        // TODO: message sys admin.
      }
      res.sendStatus(503);
    });
});

export default router;
