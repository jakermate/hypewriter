import logo from './logo.svg';
import 'react-simple-keyboard/build/css/index.css';
import './App.css';
import Keyboard from 'react-simple-keyboard'
import { useEffect, useState, useRef } from 'react';
import char from 'char-to-string'
import Letter from './components/Letter';
import Switch from './components/Switch';
import Matrix from './components/Matrix';
import Typewriter from './components/Typewriter';

class KeyObj {
  ageLimit = 2
  constructor(keyString) {
    this.string = keyString
    this.age = 0
    this.vector = this.getRandomVector()
    this.id = Math.random() * 100 * Math.random()
    this.color = this.getRandomColor()
    this.rand = Math.random()
  }
  incrementAge(amount) {
    this.age += amount
  }
  getRandomVector() {
    return {
      x: Math.random() > .5 ? Math.random() * this.getRandomSpeed() : - Math.random() * this.getRandomSpeed(),
      y: - Math.random() * this.getRandomSpeed()
    }
  }
  getRandomSpeed() {
    return Math.random() * 10000
  }
  getRandomColor() {
    return Math.random() > .5 ? '#00ff41' : '008f11'
  }
 
}

function App() {
  // DISPLAYED KEY OBJECTS
  const [keys, setKeys] = useState([])
  const keyref = useRef()
  const [newKey, setNewKey] = useState("")
  // KEYBOARD UP/DOWN STATE
  const [pressed, setPressed] = useState([])
  const keyboardRef = useRef(null)
  // SETUP
  useEffect(() => {
    // Set theme
    setLight()
    // Listeners
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    const interval = setInterval(() => {
      updateKeys()
    }, 1000)
    return () => {
      clearInterval(interval)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])
  useEffect(() => {
    keyref.current = keys
  }, [keys])

  // METHODS
  // PHYSICAL KEYBOARD
  const handleKeyDown = (event) => {
    if(!checkIfAllowed(event.keyCode)) return
    if(event.repeat) return
    // Add to pressed
    let keyString = char(event.keyCode)
    if(pressed.includes(keyString)) return
    setPressed(old => [...old, keyString])
    // Create key object
    let newKeyObject = new KeyObj(keyString)
    setKeys(old => [...old, newKeyObject])
    setNewKey(newKeyObject.string)
  }
  const handleKeyUp = (event) => {
    let keyString = char(event.keyCode)
    setPressed(old => [...old.splice(old.indexOf(keyString))])
  }
  const checkIfAllowed = (keycode) => {
    if(checkNum(keycode) || checkOther(keycode) || checkAlpha(keycode)) return true
    return false
  }
  const checkNum = (keycode) => {
    if(keycode < 48 || keycode > 57) return false
    return true
  }
  const checkAlpha = (keycode) => {
    if(keycode < 65 || keycode > 90) return false
    return true
  }
  const checkOther = (keycode) => {
    if(keycode == 32 || 13) return true
    return false
  }
  // VIRTUAL KEYBOARD
  function keyboardPress(e){
    let keyString = e.toUpperCase()
    if(pressed.includes(keyString)) return
    setPressed(old => [...old, keyString])
    // Create key object
    let newKeyObject = new KeyObj(keyString)
    setKeys(old => [...old, newKeyObject])
    setNewKey(newKeyObject.string)
  }
  function keyboardRelease(e){
    console.log('release')
    let keyString = e.toUpperCase()
    setPressed(old => [...old.splice(old.indexOf(keyString))])
  }
  const updateKeys = () => {
    let currentKeys = keyref.current
    let newKeys = []
    for (let i = 0; i < currentKeys.length; i++) {
      if (currentKeys[i].age <= 1000) {
        let newKey = { ...currentKeys[i] }
        newKey.age += 1000
        newKeys.push(newKey)
      }
    }
    setKeys(newKeys)
  }
  // THEME
  function toggleTheme(bool){
    if(bool) setDark()
    else setLight()
  }
  function setDark(){
    document.documentElement.classList.add('dark')
    document.documentElement.classList.remove('light')
    localStorage.setItem("theme", "dark")
  }
  function setLight(){
    document.documentElement.classList.add('light')
    document.documentElement.classList.remove('dark')
    localStorage.setItem("theme", "light")
  }
 
  return (
    <div className="App bg-slate-100 dark:bg-black">
      <div id="main-body" style={{
        flexGrow: 1,
        position: 'relative'
      }}>
        {
          localStorage.getItem("theme") === "dark" ? 
          <Matrix keys={keys}></Matrix>
          :
          <Typewriter keys={keys} newKey={newKey}></Typewriter>
        }
      
      </div>
      <div className="mx-auto pb-2 sm:pb-8 sm:max-w-lg relative z-10 w-full" style={{
      }}>
        <Keyboard  display={{
          '{enter}': '&#9166;',
          '{bksp}': '&larr;',
          '{tab}': 'tab',
          '{lock}': 'lock',
          '{shift}': 'shift',
          '{space}': '&#13;',
        }} theme={'hg-theme-default  typewriter-keyboard'}
        onKeyPress={keyboardPress}  
        onKeyReleased={keyboardRelease}        
        keyboardRef={r => keyboardRef.current = r}
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
        ></Keyboard>
        <Switch toggleTheme={toggleTheme}></Switch>
      </div>
    </div>
  );
}

export default App;
