import React, { useEffect, useState } from 'react';
import Ink from './Ink'
import phrases from '../data/phrases'
import char from 'char-to-string'
import SimpleKeyboard from 'react-simple-keyboard'
import styled from 'styled-components'
import KeySound from '../sounds/typewriter_key.wav'
import ReturnSound from '../sounds/typewriter_return.wav'

export default function Typewriter(props) {
  const keySound = new Audio(KeySound)
  const returnSound = new Audio(ReturnSound)


  const generateLetter = (letterString, match) => { // Generate new letter object with random positioning for Ink component
    return {
      string: letterString + (match[1] === 0 ? "." : ""),
      randX: getRandPosNeg(),
      randY: getRandPosNeg(),
      randR: getRandPosNeg(),
      randO: Math.random() + .5,
      color: match[0] ? (Math.random() > .5 ? '#8b0000' : "#bb0a1e") : 'black'
    }
  }

  // Page
  const [paper, setPaper] = useState([[]])
  const insertInk = (newLetter) => {
    let oldPage = [...paper]
    let row = oldPage[oldPage.length - 1]
    if (row.length >= 30) {
      if (newLetter.string == " ") return
      // check rows
      if(oldPage.length >= 40){
        oldPage.shift()
      }
      props.soundEnabled && returnSound.play()
      setPaper([...oldPage, [newLetter]]) // Insert new row with new letter
      
    }
    else {
      props.soundEnabled && keySound.play()
      row.push(newLetter)
      setPaper(oldPage)
    }
  }
  // Phrases
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const pickRandomIndex = (array) => {
    let length = array.length
    return Math.floor(Math.random() * length)
  }
  const checkIfNextLetter = (letter) => {
    let phrase = currentPhrase
    if (phrase.charAt(0).toUpperCase() === letter) {
      // console.log("letter hit")
      let trimmedPhrase = phrase.substring(1)
      if (trimmedPhrase.length == 0) {
        // end statement and select new phrase
        setCurrentPhrase(phrases[pickRandomIndex(phrases)])
      }
      else {
        setCurrentPhrase(trimmedPhrase)
      }
      return [true, trimmedPhrase.length]
    }
    return [false, null]
  }
  // Handlers on each render
  useEffect(() => {
    // Events
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  })
  // INIT
  useEffect(() => {
    // Set current phrase
    setCurrentPhrase(phrases[pickRandomIndex(phrases)])
  }, [])
  // PHYSICAL KEYBOARD
  const handleKeyDown = (event) => {
    let keyString = event.key.toUpperCase()
    console.log(keyString)
    if (!checkIfAllowed(keyString)) return
    if (deleteUsed(event.keyCode)) {
      return
    }
    if (event.repeat) return
    // Create key object
    let match = checkIfNextLetter(keyString)
    const newKeyObj = generateLetter(keyString, match)
    insertInk(newKeyObj)
    if (match[1] === 0) insertBlank()
  }
  const deleteUsed = (keycode) => {
    if (keycode == 8) {
      let oldpaper = [...paper]
      oldpaper.at(-1).at(-1).color = "#ffffff"
      return true
    }
    return false
  }
  const allowedKeys = "abcdefghijklmniopqrstuvwxyz1234567890.,' ?".toUpperCase()
  const checkIfAllowed = (keycode) => {
    if (allowedKeys.includes(keycode)) return true
    return false
  }
  const checkNum = (keycode) => {
    if (48 < keycode < 57) return true
    return false
  }
  const checkAlpha = (keycode) => {
    if (65 < keycode < 90) return true
    return false
  }
  const checkOther = (keycode) => {
    if (keycode == 32 || 13 || 190) return true
    return false
  }
  const insertBlank = () => {
    let newPaper = [...paper, [], []]
    setPaper(newPaper)
  }
  // VIRTUAL KEYBOARD
  function keyboardPress(e) {
    let keyString = e.toUpperCase()
    // Create key object

  }
  function keyboardRelease(e) {
  }


  return (
    <div className="relative h-full flex flex-col">
      <Overlay direction={'bottom'} id="paper-overlay" className="z-10"></Overlay>
      <div id="type-writer" className="right-0 flex-grow left-0  bottom-0 mx-auto pb-12 flex flex-col" style={{
        perspective: '1000px',
        perspectiveOrigin: 'center 100%'
      }}>
        <div className="max-w-xl w-full rounded-md flex flex-col justify-end mx-auto mb-12 py-4 px-8 flex-grow relative" id="paper" style={{
          boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 40px 0px'
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
          
          {/* <Overlay direction={'top'} id="paper-overlay" className="z-10"></Overlay> */}
        </div>
          <div id="keyboard-container" className="rounded-lg bg-slate-300 mx-auto p-4 shadow-2xl">

        <Keyboard keyboardRelease={keyboardRelease} keyboardPress={keyboardPress}></Keyboard>
          </div>
      </div>
    </div>
  )

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

function Keyboard(props) {
  return (
    <SimpleKeyboard display={{
      '{enter}': '&#9166;',
      '{bksp}': '&larr;',
      '{tab}': 'tab',
      '{lock}': 'lock',
      '{shift}': 'shift',
      '{space}': '&#13;',
    }} theme={'hg-theme-default  typewriter-keyboard'}
      onKeyPress={props.keyboardPress}
      onKeyReleased={props.keyboardRelease}
      physicalKeyboardHighlight={true}
      physicalKeyboardHighlightBgColor={"#000000"}
      layout={{
        'default': [
          '1 2 3 4 5 6 7 8 9 0 {bksp}',
          'q w e r t y u i o p',
          'a s d f g h j k l',
          '{shift} z x c v b n m',
          '{space} {enter}'
        ],
      }}
      buttonTheme={[
        {
          class: 'keys',
          buttons: "a b c d e f g h i j k l m n o p q r s t u v w x y z 1 2 3 4 5 6 7 8 9 0 {bksp} ; ' , . {shift}"
        },
        {
          class: "space-key",
          buttons: "{space}"
        },
        {
          class: "enter-key",
          buttons: "{enter}"
        }
      ]}
    ></SimpleKeyboard>
  )
}

const Overlay = styled.div`
  position: absolute;
  left: 0;
  right:0;
  ${props => props.direction === 'bottom' ? "top: 0;" : "bottom: 0;"}
  height: 200px;
  background: linear-gradient(to ${props => props.direction}, #ffffff, #ffffff, #ffffff00);
`