import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import React from 'react'
import PlayButton from './PlayButton';
import PauseButton from './PauseButton';
import SettingsButton from './SettingsButton';
import { useContext, useState, useEffect, useRef } from 'react';
import SettingsContext from './SettingsContext';


const red = '#f54e4e'
const green = '#4aec8c'
 let rotation
 let strokeLinecap


 function  Timer () {
  const settingsInfo = useContext(SettingsContext);

  const [isPaused, setIsPaused] = useState(false);
  const [mode, setMode] = useState('work')
  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  function switchMode() {
    const nextMode = modeRef.current === 'work' ? 'break' : 'work';
    const nextSeconds = (nextMode === 'work' ? settingsInfo.workMinutes  : settingsInfo.breakMinutes ) * 60;
    setMode(nextMode);
    setSecondsLeft(nextSeconds);
    
  }

  function tick() {
   secondsLeftRef.current--;
   setSecondsLeft(secondsLeftRef.current)
    
  }

  function initTimer () {
    setSecondsLeft(settingsInfo.workMinutes * 60);


  }

  useEffect ( () => {
    initTimer();

    setInterval(() => {
      if(isPausedRef.current) {

        return;
      }
      if (secondsLeftRef.current === 0){

        return switchMode(); 
      }

      tick();
      
    }, 1000);
  }, [settingsInfo]);


  return (
    <div>
        <CircularProgressbar value={60}  text={`60%`} styles={buildStyles({rotation, strokeLinecap,
          textColor: '#fff',
          pathColor: red,
          trailColor: 'rgba (255,255,255,.2)'
        
        })}/>

        <div style={{marginTop:'20px'}}>
          {isPaused ? <PlayButton /> : <PauseButton/>}

          
        </div>

        <div style={{marginTop:'20px'}}>
          <SettingsButton onClick={() => settingsInfo.setShowSettings(true)}/>

        </div>
    </div>
  )
}

export default Timer
