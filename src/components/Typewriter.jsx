import React, { useEffect, useState } from 'react';
import Ink from './Ink'
import phrases from '../data/phrases'

export default function Typewriter(props) {
  const generateLetter = (letterString, match = false) => { // Generate new letter object with random positioning for Ink component
    return {
      string: letterString,
      randX: getRandPosNeg(),
      randY: getRandPosNeg(),
      randR: getRandPosNeg(),
      randO: Math.random() + .5,
      color: match ? 'red' : 'black'
    }
  }
  // Page
  const [paper, setPaper] = useState([[]])
  const insertInk = (newLetter) => {
    let row = paper.at(-1)
    if (row.length >= 20) {
      setPaper((oldPage) => [...oldPage, [newLetter]]) // Insert new row with new letter
    }
    else setPaper((oldPage) => { // Insert letter into existing row at end of array
      let newPage = [...oldPage]
      newPage.at(-1).push(newLetter)
      setPaper(newPage)
    })
  }
  // Phrases
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const pickRandomIndex = (array) => {
    let length = array.length
    return Math.floor(Math.random() * length)
  }
  const checkIfNextLetter = (letter) => {
    if (currentPhrase.charAt(0) === letter) {
      console.log("letter hit")
    }
  }
  // Mount
  useEffect(() => {
    setCurrentPhrase(phrases[pickRandomIndex(phrases)])
  }, [])
  // Callbacks
  // useEffect(() => {
  //   if (!props.keys.length) return
  //   if (!paper.map(i => i.id).includes(props.keys.at(-1).id)) {
  //     setPaper(old => [...old, props.keys.at(-1)])
  //   }
  // }, [props.keys])
  useEffect(() => {
    if(!props.newKey) return
    insertInk(generateLetter(props.newKey))
  }, [props.newKey])
  useEffect(() => {
    console.log(paper)
  }, [paper])
  useEffect(() => {
    // console.log(currentPhrase)
  }, [currentPhrase])
  return <div id="paper" className="w-full absolute bottom-0 mx-auto pb-12 flex flex-col" style={{
    perspective: '1000px',
    perspectiveOrigin: 'center 100%'
  }}>
    {
      paper && paper.map((row, i) => {
        return (
          <Row key={`row-${i}`}>
            {
              row.map((keyObj, j) => {
                return (
                  <Ink keyObj={keyObj} key={`row-${i}-ink-${j}`} />
                )
              })
            }
          </Row>
        )
      })
    }
  </div>
}

function Row(props) {
  return (
    <div className="flex flex-row justify-start mx-auto w-full flex-wrap row-slide" style={{
    }}>
      {props.children}
    </div>
  )
}


const getRandPosNeg = () => {
  return Math.random() > .5 ? Math.random() : -Math.random()
}
