import logo from './logo.svg';
import './App.css';
import Keyboard from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css';
import { useEffect, useState, useRef } from 'react';
import char from 'char-to-string'
import Letter from './components/Letter';

class KeyObj{
  ageLimit = 2
  constructor(keyString){
    this.string = keyString
    this.age = 0
    this.vector = this.getRandomVector()
    this.id = Math.random() * 100 * Math.random()
    this.color = this.getRandomColor()
  }
  incrementAge(amount){
    this.age += amount
  }
  getRandomVector(){
    return {
      x: Math.random() > .5 ? Math.random() * this.getRandomSpeed() : - Math.random() * this.getRandomSpeed(),
      y: - Math.random() * this.getRandomSpeed()
    }
  }
  getRandomSpeed(){
    return Math.random() * 10000
  }
  getRandomColor(){
    return Math.random() > .5 ? '#00ff41' : '008f11'
  }
}

function App() {
  const [keys, setKeys] = useState([])
  const keyref = useRef()
  // SETUP
  useEffect(()=>{
    window.addEventListener('keydown', handleKeyDown)
    const interval = setInterval(() => {
      updateKeys()
    }, 1000)
    return () => {
      clearInterval(interval)
      window.removeEventListener('keydown', handleKeyDown);
    };
  },[])
  useEffect(()=>{
    keyref.current = keys
  },[keys])
  // METHODS
  const handleKeyDown = (event) => {
    let keyObj = new KeyObj(char(event.keyCode))
    setKeys(old => [...old, keyObj])
  }
  const updateKeys = () => {
    let currentKeys = keyref.current
    let newKeys = []
    for(let i = 0; i < currentKeys.length; i++){
      if(currentKeys[i].age <= 1000) {
        let newKey = {...currentKeys[i]}
        newKey.age += 1000
        newKeys.push(newKey)
      }
    }
    setKeys(newKeys)
  }
  return (
    <div className="App">
      <div id="main-body" style={{
        flexGrow:1,
        position: 'relative'
      }}>
        {
          keys.map(keyContainer=>{
            return(
              <Letter key={keyContainer.id} letter={keyContainer} />
            )
          })
        }
      </div>
      <div style={{
        width: 400,
        margin:'0 auto',
        paddingBottom: '1rem'
      }}>
      
      <Keyboard display={{
        '{enter}': 'enter',
        '{bksp}': 'bksp',
        '{tab}': 'tab',
        '{lock}': 'lock',
        '{shift}': 'shift',
        '{space}': 'space',
        }} theme={'hg-theme-default hg-layout-default matrix-keyboard'}></Keyboard>
      </div>
    </div>
  );
}

export default App;
