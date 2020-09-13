import { Router, Request, Response } from "express";
import { BreedService } from "../services";
import { BreedJSON } from "../models";
import { ApiIncompatibleException } from "../exceptions";

const router = Router();

const fetchImages = (req: Request, res: Response) => {
  const breed: BreedJSON = {
    breed: req.params.qBreed,
    subbreed: req.params.qSubbreed,
  }
  const breedService: BreedService = new BreedService();
  breedService.fetchImages(breed)
    .then((data: string[]) => {
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
};
//Get all images of a breed.
router.get("/:qBreed", fetchImages);
//Get all images of a subbreed.
router.get("/:qBreed/:qSubbreed", fetchImages);


export default router;
