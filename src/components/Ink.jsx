import React from 'react';
import styled, {keyframes} from 'styled-components'

export default function Ink(props) {
  return <InkSpan className="block font-mono relative" style={{
    top: `${Math.random() > .5 ? 1 : -1}px`,
    left: `${Math.random() > .5 ? 1 : -1}px`
  }}>
      {props.keyObj.string}
  </InkSpan>
}
const slam = keyframes`
  from{
    opacity: 0;
    transform: translateZ(1000px) scale(3) rotate(0deg);
  }
  to{
    opacity: 1;
    transform: translateZ(0px) scale(1);
  }
`
const InkSpan = styled.span`
  animation: ${slam} .1s linear forwards;
`