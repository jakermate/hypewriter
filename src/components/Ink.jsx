import React from 'react';
import styled, {keyframes} from 'styled-components'

export default function Ink(props) {
  return <InkSpan opacity={props.keyObj.randO} className="block font-mono relative text-xl font-bold w-4" style={{
    top: `${props.keyObj.randX}px`,
    left: `${props.keyObj.randY}px`,
    fontFamily: 'monospace',
    opacity: `${props.keyObj.randO}`
  }}>
      {props.keyObj.string}
  </InkSpan>
}
const slam = (opacity) => keyframes`
  from{d
    opacity: 0;
    transform: translateZ(1000px) scale(3) rotate(0deg);
  }
  to{
    opacity: ${opacity * 2};
    transform: translateZ(0px) scale(1);
  }
`
const InkSpan = styled.span`
  animation: ${slam} .1s linear forwards;
`