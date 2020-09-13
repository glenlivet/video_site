
import { BreedEntity, BreedJSON } from "../models";

class BreedListTransformer {

  static toBreedEntities(breedJSONs: BreedJSON[]): BreedEntity[] {
    const retVal: BreedEntity[] = [];
    const breedMap: Map<string, BreedJSON[]> = new Map();
    for (let i in breedJSONs) {
      let currentBreed = breedJSONs[i];
      let breedArr: BreedJSON[] = breedMap.get(currentBreed.breed) || [];
      breedArr.push(currentBreed);
      breedMap.set(currentBreed.breed, breedArr);
    }
    for (let key of breedMap.keys()) {
      let subbreeds: string[] = [];
      const subs: BreedJSON[] = breedMap.get(key) || [];
      for (let i in subs) {
        if (subs[i].subbreed !== undefined) {
          let subbreed: string | undefined = subs[i].subbreed;
          subbreed ? subbreeds.push(subbreed) : subbreeds.entries;
        }
      }
      let distinctSubs = [...new Set(subbreeds)];
      const breedEntity: BreedEntity = {
        name: key,
        subbreeds: distinctSubs
      }
      retVal.push(breedEntity);
    }
    return retVal;
  }
}

export default BreedListTransformer;
