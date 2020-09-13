import React from "react";

type ImageContainerProps = {
  src?: string, //image src
  containerClass?: string, //wrapper class name
  imageClass?: string //image tag class name
}

class ImageContainer extends React.Component<ImageContainerProps, {}> {
  render() {
    let containerClassName = this.props.containerClass;
    if (this.props.src !== undefined) {
      //it is not a placeholder
      containerClassName += " image-container-border";
    }
    return (
      <div className={`image-container image-container-lg image-container-xs ${containerClassName}`}>
        <img key={this.props.src} src={this.props.src} className={`dog-image ${this.props.imageClass}`} />
      </div>);

  }
}

export default ImageContainer;
