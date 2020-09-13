import React from "react";
import ImageContainer from "./ImageContainer";

type ImageGroupProps = {
  srcList: string[], //image src
  containerClass?: string, //wrapper class name
  imageClass?: string //image tag class name
}


class ImageGroup extends React.Component<ImageGroupProps, {}> {
  render() {

    const containers = this.props.srcList.map((url) =>
      <ImageContainer key={url} src={url} imageClass={`${this.props.imageClass ? this.props.imageClass : ''}`}
        containerClass={`${this.props.containerClass ? this.props.containerClass : ''}`} />
    );

    if (this.props.srcList.length % 2 == 1) {
      containers.push(
        <ImageContainer key="_placeholder" />
      );
    }
    return (
      <div className="image-group">
        {containers}
      </div>
    );
  }
}

export default ImageGroup;
