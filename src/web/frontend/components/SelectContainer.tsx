import React from "react";

interface SelectContainerProps {
  selectType: string, // breed or subbreed
  options: string[], //image src
  containerClass?: string, //wrapper class name
  selectClass?: string, //image tag class name
  selected?: string,
  onChange(val: string): any
}


class SelectContainer extends React.Component<SelectContainerProps, {}> {
  constructor(props: SelectContainerProps) {
    super(props);
  }
  render() {
    if (this.props.options.length === 0) {
      return (
        <div className={`select-container select-container-xs select-container-lg ${this.props.containerClass ? this.props.containerClass : ''} container-invisible`}>
        </div>
      );
    }

    const options = this.props.options.map((item) => {
      if (item === this.props.selected) {
        return (
          <option key={item} value={item} selected>{item}</option>
        );
      } else {
        return (
          <option key={item} value={item}>{item}</option>
        );
      }
    }
    );
    options.unshift(
      <option key="_placeholder">{`Please select ${this.props.selectType}`}</option>
    );
    return (
      <div className={`select-container select-container-xs select-container-lg ${this.props.containerClass ? this.props.containerClass : ''}`}>
        <select
          className={`breed-select ${this.props.selectClass ? this.props.selectClass : ''}`}
          onChange={this.onSelectChange.bind(this)}>
          {options}
        </select>
      </div>);

  }
  onSelectChange(e: any) {
    this.props.onChange(e.target.value);
  }
}

export default SelectContainer;
