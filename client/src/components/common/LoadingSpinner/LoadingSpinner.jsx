import React from 'react';
import PropTypes from 'prop-types';
import { SpinnerWrapper, Spinner, SpinnerText } from './LoadingSpinnerStyles';

const LoadingSpinner = ({ size, color, text }) => {
  return (
    <SpinnerWrapper>
      <Spinner size={size} color={color} />
      {text && <SpinnerText color={color}>{text}</SpinnerText>}
    </SpinnerWrapper>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  text: PropTypes.string
};

export default LoadingSpinner;
