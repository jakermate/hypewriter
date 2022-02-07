import React, { useEffect, useState, useRef } from 'react';
import styled, {keyframes} from 'styled-components'
export default function Letter(props) {
  return <LetterDiv  rand={props.letter.rand} vector={props.letter.vector} className="matrix-font font-mono" style={{
    position: 'absolute',
    fontFamily: 'monospace',
    bottom: 0,
    left: '50%',
    color: props.theme == "light" ? "black" : props.letter.color,
    fontSize: '6rem',
    // fontWeight: 600,
    transition: 'all 2s linear',
  }}>
    {props.letter.string.toLowerCase()}
  </LetterDiv>;
}

const fly = (x, y, rand) => keyframes`
  from{
    transform: translate(0px, 0px) scale(1);
    opacity: 1;
  }
  to{
    transform: translate(${x}px, ${y}px) scale(${rand > .5 ? 2 : 0});
    opacity: 0;
  }
`
const LetterDiv = styled.div`
  animation: ${props => fly(props.vector.x, props.vector.y, props.rand)} 2s linear forwards;
`