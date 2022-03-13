import logo from './logo.svg';
import 'react-simple-keyboard/build/css/index.css';
import './App.css';
import { useEffect, useState, useRef } from 'react';
import Switch from './components/ModeSwitch';
import Matrix from './components/Matrix';
import Typewriter from './components/Typewriter';
import SoundSwitch from './components/SoundSwitch';


function App() {
  // SETUP
  useEffect(() => {
    // Set theme
    setLight()
    getSoundPreference()
    return () =>{
    }
  }, [])
 
  const [theme, setTheme] = useState('light')
  const [soundEnabled, setSoundEnabled] = useState(false)

  // THEME
  function toggleTheme(bool){
    if(bool) setDark()
    else setLight()
  }
  function setDark(){
    document.documentElement.classList.add('dark')
    document.documentElement.classList.remove('light')
    localStorage.setItem("theme", "dark")
    setTheme("dark")
  }
  function setLight(){
    document.documentElement.classList.add('light')
    document.documentElement.classList.remove('dark')
    localStorage.setItem("theme", "light")
    setTheme("light")
  }
  // Sound
  function toggleSound(bool, toggleRef){
    toggleRef.current.$inputRef.blur()
    if(bool) enableSound()
    else disableSound()
  }
  function getSoundPreference(){
    let soundEnabledString = localStorage.getItem('soundEnabled')
    console.log(soundEnabledString)
    if(soundEnabledString == null){
      enableSound()
      return
    }
    if(soundEnabledString === "true"){
      enableSound()
      return
    }
    disableSound()
  }
  function enableSound(){
    setSoundEnabled(true)
    localStorage.setItem('soundEnabled', "true")
    console.log(localStorage.getItem('soundEnabled'))
  }
  function disableSound(){
    setSoundEnabled(false)
    localStorage.setItem('soundEnabled', "false")
    console.log(localStorage.getItem('soundEnabled'))
  }
  return (
    <div className="App bg-slate-100 dark:bg-black">
      <div id="main-body" style={{
        flexGrow: 1,
        position: 'relative'
      }}>
        {
          theme === "dark" ? 
          <Matrix soundEnabled={soundEnabled}></Matrix>
          :
          <Typewriter soundEnabled={soundEnabled}></Typewriter>
        }
      
      </div>
      <div className="mx-auto pb-2 sm:pb-8 sm:max-w-lg relative z-10 w-full" style={{
      }}>
        
        <Switch toggleTheme={toggleTheme} ></Switch>
        <SoundSwitch toggleSound={toggleSound} soundEnabled={soundEnabled}></SoundSwitch>
      </div>
    </div>
  );
}

export default App;
