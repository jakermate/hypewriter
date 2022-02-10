import logo from './logo.svg';
import 'react-simple-keyboard/build/css/index.css';
import './App.css';
import { useEffect, useState, useRef } from 'react';
import Switch from './components/Switch';
import Matrix from './components/Matrix';
import Typewriter from './components/Typewriter';


function App() {
  // SETUP
  useEffect(() => {
    // Set theme
    setLight()
  }, [])
 

 

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
          <Matrix></Matrix>
          :
          <Typewriter></Typewriter>
        }
      
      </div>
      <div className="mx-auto pb-2 sm:pb-8 sm:max-w-lg relative z-10 w-full" style={{
      }}>
        
        <Switch toggleTheme={toggleTheme}></Switch>
      </div>
    </div>
  );
}

export default App;
