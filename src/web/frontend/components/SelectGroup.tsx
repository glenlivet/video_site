import React from "react";
import { BreedService } from "../../services/BreedService";
import SelectContainer from "./SelectContainer";
import { BreedEntity } from "../../models/BreedEntity";
import { BreedJSON } from "../../models/BreedJSON";
import BreedListTransformer from "../../utils/BreedListTransformer";
import { GeneralHttpException } from "../../exceptions/GeneralHttpException";
import ImageGroup from "./ImageGroup";

import { api_fetch_breeds, api_fetch_images } from "../../constants/apis";

interface SelectGroupState {
  breedList: BreedEntity[],
  selectedBreed: BreedEntity | undefined,
  selectedSubbreed: string | undefined,
  isLoaded: boolean,
  imgs: string[],
  error: Error | null
}

class SelectGroup extends React.Component<{}, SelectGroupState> {
  breedService: BreedService;
  constructor(props: any) {
    super(props);
    this.breedService = new BreedService();
    this.state = {
      breedList: [],
      imgs: [],
      selectedBreed: undefined,
      selectedSubbreed: undefined,
      isLoaded: false,
      error: null
    }
  }
  componentDidMount() {
    this.fetchAllBreeds.call(this);
  }

  render() {
    const { error, isLoaded, breedList, selectedBreed, imgs } = this.state;
    if (error) {
      return (<div>503</div>);
    } else if (!isLoaded) {
      return (<div>loading...</div>);
    } else {
      const breeds = breedList.map((item) => item.name);
      const subbreeds = selectedBreed ? selectedBreed.subbreeds : [];
      return (
        <div className="app-container">
          <div className="select-group">
            <SelectContainer options={breeds} selectType="breed" onChange={this.handleBreedSelect.bind(this)} />
            <SelectContainer options={subbreeds} selectType="breed" onChange={this.handleSubbreedSelect.bind(this)} />
          </div>
          <ImageGroup srcList={imgs} />
        </div>
      );

    }
  }
  handleBreedSelect(e: string) {
    const { breedList } = this.state;
    console.log("select breed: " + e);
    const found = breedList.find((ele) => ele.name === e);
    if (found === undefined) {
      this.setState({
        error: new Error("the selected breed is not found in the state.")
      })
    }
    this.setState({ selectedBreed: found });
    this.fetchImages.call(this, found ? found.name : "", null);
  }
  handleSubbreedSelect(e: string) {
    const { selectedBreed } = this.state;
    const breed = selectedBreed ? selectedBreed.name : null;
    if (breed === null) {
      this.setState({
        error: new Error("try to select subbreed while breed is not selected!")
      });
    } else {
      console.log("select breed: " + breed
        + ", select sub: " + e);
      this.fetchImages.call(this, breed, e);
    }
  }

  fetchData<T>(url: string, success: (result: T) => void): void {
    fetch(url)
      .then(res => {
        if (!res.ok) {
          console.error("res is not ok!");
          res.text().then(text => {
            throw new GeneralHttpException(res.status, text);
          });
        } else {
          console.debug("res is ok!");
          return res.json();
        }
      })
      .then(success)
      .catch(err => {
        console.error("error catched! ");
        //handle AJAX error.
        this.setState({
          isLoaded: true,
          error: err
        });
      });
  }

  fetchAllBreeds() {
    const success = (result: BreedJSON[]) => {
      console.log("total breeds size is " + result.length);
      BreedListTransformer.toBreedEntities(result);
      this.setState({
        breedList: BreedListTransformer.toBreedEntities(result),
        isLoaded: true
      });
    };
    this.fetchData(api_fetch_breeds, success.bind(this));
  }

  fetchImages(breed: string, e: string | null) {
    const success = (result: string[]) => {
      console.log("total image size is " + result.length);
      this.setState({
        imgs: result,
        isLoaded: true
      })
    }
    const url = `${api_fetch_images}/${breed}${e ? ('/' + e) : ''}`;
    console.log("query images: " + url);
    this.fetchData(url, success.bind(this));
  }
}

export default SelectGroup;
