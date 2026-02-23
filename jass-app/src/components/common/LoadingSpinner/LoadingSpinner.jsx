import React from 'react';
import { SpinnerWrapper, Spinner, SpinnerText } from './LoadingSpinnerStyles';

const LoadingSpinner = ({ size, color, text }) => {
  return (
    <SpinnerWrapper>
      <Spinner size={size} color={color} />
      {text && <SpinnerText color={color}>{text}</SpinnerText>}
    </SpinnerWrapper>
  );
};

export default LoadingSpinner;
