import React from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  linkWrapper: {
    textDecoration: 'none',
    width: 'fit-content',
    width: '100%',
    height: '100%'
  },
}))

const Button = styled.div`
  background: ${props => props.background};
  border: 2px solid ${props => props.border};
  width: fit-content;
  border-radius: 3px;
  transition: 0.3s;
  margin: auto;
  cursor: pointer;
  color: ${props => props.color};
  font-size: ${props => props.fontSize}px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: ${props => props.pd}px;
  padding-right: ${props => props.pd}px;
  &:hover {
    background: white;
    color : ${props => props.hoverColor}
  }
`;

export default function MainButton(props) {
  const classes = useStyles()
  const history = useHistory()

  const onClick = () => {
    history.push(props.to)
  }
  return (
    <Button
      background={props.background}
      height={props.height}
      width={props.width}
      pd={props.pd}
      fontSize={props.fontSize}
      onClick={onClick}
      border={props.border}
      color={props.color}
      hoverColor={props.hoverColor}
    >
      {props.label}
    </Button>
  )
}
