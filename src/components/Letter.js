import React, { useEffect, useState, useRef } from 'react';
import styled, {keyframes} from 'styled-components'
export default function Letter(props) {
  return <LetterDiv vector={props.letter.vector} className="matrix-font" style={{
    position: 'absolute',
    bottom: 0,
    left: '50%',
    color: props.letter.color,
    fontSize: '6rem',
    fontWeight: 600,
    transition: 'all 2s linear',
  }}>
    {props.letter.string.toLowerCase()}
  </LetterDiv>;
}

const fly = (x, y) => keyframes`
  from{
    transform: translate(0px, 0px);
    opacity: 1,
  }
  to{
    transform: translate(${x}px, ${y}px);
    opacity: 0;
  }
`
const LetterDiv = styled.div`
  animation: ${props => fly(props.vector.x, props.vector.y)} 2s linear forwards;
`