import React from "react";
import styled from "styled-components";

const LoadingWrapper = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  font-size: 30px;
  display: flex;
  margin: auto;
  align-items: center;
  height: ${(props) => props.height};
  background: RGB(255, 255, 255, 0.8);
  padding-left: 45%;
  z-index: 10000;
`;

export default function LoadingCircular(props) {
  return (
    <LoadingWrapper height={props.height}>
      <div size={100}>
        <img
          src={`${process.env.PUBLIC_URL}/img/test/loading.jpg`}
          alt="img"
          style={{ width: "50px" }}
        />
      </div>
    </LoadingWrapper>
  );
}
