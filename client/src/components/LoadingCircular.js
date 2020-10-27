import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';

const LoadingWrapper = styled.div`
  position: absolute;
  width: 100%;
  padding-top: 50%;
  font-size: 30px;
  align-items: center;
  height: 100%;
  background: RGB(255,255,255, 0.8);
  text-align: center;
  z-index: 1;
`;

export default function LoadingCircular() {
  return (
    <LoadingWrapper>
      <CircularProgress disableShrink size={100} />
    </LoadingWrapper>
  )
}
