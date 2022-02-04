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
    this.speed = this.getRandomSpeed()
  }
  incrementAge(amount){
    this.age += amount
  }
  getRandomVector(){
    return {
      x: Math.random() > .5 ? Math.random() : - Math.random(),
      y: Math.random() > .5 ? Math.random() : - Math.random()
    }
  }
  getRandomSpeed(){
    return Math.random() * 100
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
              <Letter letter={keyContainer} />
            )
          })
        }
      </div>
      <div style={{
        width: 400,
        margin:'0 auto',
        paddingBottom: '1rem'
      }}>
      
      <Keyboard></Keyboard>
      </div>
    </div>
  );
}

export default App;
