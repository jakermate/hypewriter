import logo from './logo.svg';
import './App.css';
import Keyboard from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css';
import { useEffect, useState, useRef } from 'react';
import char from 'char-to-string'
import Letter from './components/Letter';
import Switch from './components/Switch';

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
  const [keys, setKeys] = useState([])
  const keyref = useRef()
  // SETUP
  useEffect(() => {
    // Set theme
    setLight()
    // Listeners
    window.addEventListener('keydown', handleKeyDown)
    const interval = setInterval(() => {
      updateKeys()
    }, 1000)
    return () => {
      clearInterval(interval)
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [])
  useEffect(() => {
    keyref.current = keys
  }, [keys])
  // METHODS
  const handleKeyDown = (event) => {
    let keyObj = new KeyObj(char(event.keyCode))
    setKeys(old => [...old, keyObj])
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
    localStorage.setItem("theme", "light")
  }
  function setLight(){
    document.documentElement.classList.add('light')
    document.documentElement.classList.remove('dark')
    localStorage.setItem("theme", "dark")
  }
  return (
    <div className="App bg-white dark:bg-black">
      <div id="main-body" style={{
        flexGrow: 1,
        position: 'relative'
      }}>
        {
          keys.map(keyContainer => {
            return (
              <Letter theme={localStorage.getItem("theme")} key={keyContainer.id} letter={keyContainer} />
            )
          })
        }
      </div>
      <div className="mx-auto pb-8 max-w-lg" style={{
      }}>
        <Keyboard display={{
          '{enter}': 'enter',
          '{bksp}': 'bksp',
          '{tab}': 'tab',
          '{lock}': 'lock',
          '{shift}': 'shift',
          '{space}': 'space',
        }} theme={'hg-theme-default hg-layout-default matrix-keyboard'}
        onChange={(k) => console.log(k)}
        ></Keyboard>
        <Switch toggleTheme={toggleTheme}></Switch>
      </div>
    </div>
  );
}

export default App;
