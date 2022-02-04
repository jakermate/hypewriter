import React from 'react';

export default function Letter(props) {
  return <div style={{
    position: 'absolute',
    bottom: 0,
    left: '50vw',
    fontSize: '2rem',
    transition: 'all 1s linear',
  }}>
    {props.letter.string}
  </div>;
}
