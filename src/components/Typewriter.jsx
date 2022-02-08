import React, { useEffect, useState } from 'react';
import Ink from './Ink'
export default function Typewriter(props) {
    const [page, editPage] = useState([])
    const [line, setLine] = useState(0)
    useEffect(()=>{
      if(!props.keys.length) return 
      if(!page.map(i=>i.id).includes(props.keys.at(-1).id)){
        editPage(old => [...old, props.keys.at(-1)])
      }
    }, [props.keys])
  return <div id="paper" className="w-full absolute bottom-0 mx-auto pb-12 flex flex-col-reverse" style={{
    perspective: '1000px',
    perspectiveOrigin: 'center 100%'
  }}>
    {
      page.map((keyObj)=>{
        return(
          <Ink keyObj={keyObj} key={keyObj.id} />
        )
      })
    }
  </div>;
}

function Row(props){
  return(
    <div className="flex flex-row justify-start">
      {props.children}
    </div>
  )
}