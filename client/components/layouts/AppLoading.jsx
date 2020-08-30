import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled('div')`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Spinner = styled('div')`
  height: 30px;
  width: 30px;
  border: 1px solid #4c4c4c;
  border-radius: 50%;
  border-top: none;
  border-right: none;
  margin: ${(p) => p.theme.space}px auto;
  animation: ${rotation} 1s linear infinite;
`;

const AppLoading = ({ msg = 'loading...' }) => (
  <Wrapper>
    <Spinner />
  </Wrapper>
);

AppLoading.propTypes = {
  // eslint-disable-next-line react/require-default-props
  msg: PropTypes.string,
};

export { AppLoading };
