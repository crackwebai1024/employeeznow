import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';

const LoadingWrapper = styled.div`
  position: absolute;
  width: 100%;
  font-size: 30px;
  display: flex;
  margin: auto;
  align-items: center;
  height: 100%;
  background: RGB(255,255,255, 0.8);
  padding-left: 45%;
  z-index: 1;
`;

export default function LoadingCircular() {
  return (
    <LoadingWrapper>
      <CircularProgress disableShrink size={100}/>
    </LoadingWrapper>
  )
}
