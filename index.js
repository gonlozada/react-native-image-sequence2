import React, { Component } from 'react';
import {
  View,
  requireNativeComponent,
  ViewPropTypes
} from 'react-native';
import { bool, string, number, array, shape, arrayOf } from 'prop-types';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import PropTypes from 'prop-types'

class ImageSequence extends Component {
  _onAnimationFinished = (event) => {
    if (!this.props.onAnimationFinished) {
      return;
    }

    // process raw event...
    this.props.onAnimationFinished(event.nativeEvent);
  }
  render() {
    let normalized = this.props.images.map(resolveAssetSource);

    // reorder elements if start-index is different from 0 (beginning)
    if (this.props.startFrameIndex !== 0) {
      normalized = [...normalized.slice(this.props.startFrameIndex), ...normalized.slice(0, this.props.startFrameIndex)];
    }

    return (
      <RCTImageSequence
        {...this.props}
        images={normalized} 
        onAnimationFinished={this._onAnimationFinished}/>
    );
  }
}

ImageSequence.defaultProps = {
  startFrameIndex: 0,
  framesPerSecond: 24,
  loop: true,
  onAnimationFinished : (e) => {console.log(e)}
};

ImageSequence.propTypes = {
  startFrameIndex: number,
  images: array.isRequired,
  framesPerSecond: number,
  loop: bool,
  onAnimationFinished : PropTypes.func
};

const RCTImageSequence = requireNativeComponent('RCTImageSequence', {
  propTypes: {
    ...ViewPropTypes,
    images: arrayOf(shape({
      uri: string.isRequired
    })).isRequired,
    framesPerSecond: number,
    loop: bool
  },
});

export default ImageSequence;
