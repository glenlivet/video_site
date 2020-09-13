import {
  url_breed_list_all,
  url_image_fetch_prefix,
  dogceo_resp_status_success,
} from "../constants";
import { BreedJSON, ReturnMessage } from "../models";
import {
  ServiceNotAvailableException,
  ApiIncompatibleException,
} from "../exceptions";
import fetch from "node-fetch";

/**
 * The Dog CEO API Proxy.
 */
export class BreedService {
  async listAll(): Promise<BreedJSON[]> {
    return this.restfulCall(
      url_breed_list_all,
      BreedService.parseBreedList.bind(this)
    );
  }

  async fetchImages(breed: BreedJSON): Promise<string[]> {
    const url = BreedService.generateImageURL(breed);
    return this.restfulCall(url, BreedService.parseImageURLs.bind(this));
  }

  async restfulCall<T>(url: string, transform: (msg: ReturnMessage) => T) {
    console.log(`calling URL: ${url}.`);
    return new Promise<T>((resolve, reject) => {
      fetch(url)
        .then((resp) => resp.json())
        .then((body) => {
          try {
            resolve(transform(body));
          } catch (err) {
            reject(err);
          }
        })
        .catch((err) => {
          reject(new ServiceNotAvailableException());
        });
    });
  }

  static generateImageURL(breed: BreedJSON): string {
    return `${url_image_fetch_prefix}/${breed.breed}${
      breed.subbreed ? "/" + breed.subbreed : ""
    }/images`;
  }

  static parseImageURLs(retMsg: ReturnMessage): string[] {
    if (retMsg.status === dogceo_resp_status_success) {
      return (retMsg.message as string[]) || [];
    } else {
      throw new ApiIncompatibleException();
    }
  }

  static parseBreedList(retMsg: ReturnMessage): BreedJSON[] {
    const retVal: BreedJSON[] = [];
    if (retMsg.status === dogceo_resp_status_success) {
      let breedMap = retMsg.message;
      for (let eachBreed in breedMap) {
        let subArray: string[] = (<any>breedMap)[eachBreed];
        if (subArray.length === 0) {
          retVal.push({ breed: eachBreed });
        } else {
          for (let i in subArray) {
            retVal.push({ breed: eachBreed, subbreed: subArray[i] });
          }
        }
      }
    } else {
      throw new ApiIncompatibleException();
    }
    return retVal;
  }
}
