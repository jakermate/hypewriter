import React from 'react';
import styled, {keyframes} from 'styled-components'

export default function Ink(props) {
  return <InkSpan opacity={props.keyObj.randO} rotation={props.keyObj.randR} className="block font-mono relative text-xl font-bold w-4" style={{
    top: `${props.keyObj.randX * .5}px`,
    left: `${props.keyObj.randY * .5}px`,
    fontFamily: 'monospace',
    opacity: `${props.keyObj.randO}`,
    color: `${props.keyObj.color}`
  }}>
      {props.keyObj.string}
  </InkSpan>
}
const slam = (opacity, rotation) => keyframes`
  from{
    opacity: 0;
    transform: translateZ(1000px) scale(3) rotate(0deg);
  }
  to{
    opacity: ${opacity * 2};
    transform: translateZ(0px) scale(1) rotate(${rotation*100}deg);
  }
`
const InkSpan = styled.span`
  animation: ${slam} .1s linear forwards;
`