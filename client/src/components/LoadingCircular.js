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
  z-index: 10000;
`;

export default function LoadingCircular({ text }) {
  return (
    <LoadingWrapper>
      <div disableShrink size={100}>
        <img src={`${process.env.PUBLIC_URL}/img/loading.jpg`} style={{ width: '50px' }} />
      </div>
    </LoadingWrapper>
  )
}
