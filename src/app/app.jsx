import React, { useState, useEffect, useRef } from 'react'
import '../styles/Metronome.css'
import {play1, play2, play3} from '../scripts/metronome'
//import Timer from '../scripts/timer'

const App = () => {
  const [BPM, setBPM] = useState(140)
  const bpmRef = useRef(BPM)
  bpmRef.current = BPM
  const currentTimer = useRef(0)
  const [Metrica, setMetrica] = useState(4)
  const metricaRef = useRef(Metrica)
  metricaRef.current = Metrica
  const [Tempo, setTempo] = useState('Nice and Steady')
  const [Start, setStart] = useState('START')
  const [clicked, setClicked] = useState(false)
  const countRef = useRef(0)
  const [Bit, setBit] = useState(false)
  const bitRef = useRef(Bit)
  bitRef.current = Bit

  function Sound3(){
    const sound = setTimeout(() => {
      play3()
      console.log(`sonido2 ${currentTimer.current*0.495}`)
      console.log(`sonido2 ${currentTimer.current*0.5}`)
    }, currentTimer.current*0.495)
  }

  function playsound (){
    if (countRef.current === metricaRef.current){
      countRef.current = 0
    }
    if (countRef.current === 0){
      play1()
      console.log(`sonido ${currentTimer.current}`)
      if (bitRef.current){
        const newSound = new Sound3()
      }  
    }else{
      play2()
      console.log(`sonido ${currentTimer.current}`)
      if (bitRef.current) {
        const newSound = new Sound3()
      } 
    }
    countRef.current ++ 
  }

  function Timer(callback, timeInterval, options) {
    currentTimer.current = timeInterval

    useEffect(() => {
      if(clicked){
      // Set the expected time. The moment in time we start the timer plus whatever the time interval is. 
        this.expected = Date.now() + currentTimer.current
        // Start the timeout and save the id in a property, so we can cancel it later
        this.theTimeout = null;
        
        if (options.immediate) {
          callback();
        } 

        this.timeout = setTimeout(this.round, currentTimer.current)
        //console.log('Timer Started');

        return () => {
          clearTimeout(this.timeout)
          countRef.current = 0
          //console.log('Timer Stopped');
        }
      }
    }, [clicked])
    // Round method that takes care of running the callback and adjusting the time
    this.round = () => {
      //console.log('timeout', this.timeout);
      // The drift will be the current moment in time for this round minus the expected time..
      let drift = Date.now() - this.expected
      // Run error callback if drift is greater than time interval, and if the callback is provided
      if (drift > this.timeInterval) {
        // If error callback is provided
        if (options.errorCallback) {
          options.errorCallback()
        }
      }
      callback();
      // Increment expected time by time interval for every round after running the callback function.
      this.expected += currentTimer.current
      //console.log('Drift:', drift);
      //console.log('Next round time interval:', this.timeInterval - drift);
      // Run timeout again and set the timeInterval of the next iteration to the original time interval minus the drift.
      this.timeout = setTimeout(this.round, currentTimer.current - drift)
    }
  }

  const metro = new Timer(playsound, 60000/bpmRef.current, {immediate: true})

  const setTempoText = () => {
    if (bpmRef.current <= 40) setTempo('Super Slow') 
    else if (bpmRef.current < 80) setTempo('Slow') 
    else if (bpmRef.current < 120) setTempo('Getting there') 
    else if (bpmRef.current < 180) setTempo('Nice and Steady') 
    else if (bpmRef.current < 220) setTempo("Rock n' Roll") 
    else if (bpmRef.current < 240) setTempo('Funky Stuff') 
    else if (bpmRef.current < 260) setTempo('Relax Dude')
    else if (bpmRef.current <= 280) setTempo('Eddie Van Halen') 
  }

  const handleClick = (event) => {
    const {id} = event.currentTarget.dataset
    if (id === 'BPM-decrease') {
      if (bpmRef.current === 20) return
      setBPM(BPM - 1)
      setTempoText()
    } else if (id === 'BPM-increase') {
      if (bpmRef.current === 280) return
      setBPM(BPM + 1)
      setTempoText()
    } else if (id === 'subtract-beats') {
      if (metricaRef.current === 2) return
      setMetrica(Metrica - 1)
      countRef.current = 0
    } else if (id === 'add-beats') {
      if (metricaRef.current === 7) return
      setMetrica(Metrica + 1)
      countRef.current = 0
    } else if (id === 'start-stop') {
      if (clicked === false) {
        setStart('STOP')
        setClicked(true)
      } else if (clicked === true) {
        setStart('START')
        setClicked(false)
      }
    }
  }
  const handleChange = (event) => {
    const newValue = parseInt(event.currentTarget.value, 10)
    setBPM(newValue)
    setTempoText()
  }

  return (
    <div className="Container">
      <div className="Metronome">
        <div className="bpm-display">
          <span className="tempo">{BPM}</span>
          <span>BPM</span>
        </div>
        <div className="tempo-text">{Tempo}</div>
        <div className="tempo-settings">
          <button type="button" data-id="BPM-decrease" className="adjust-tempo-btn decrease-tempo" onClick={( event ) => handleClick(event)}><span className="styleSpan">-</span></button>
          <input type="range" min="20" max="280" step="1" className="slider" onChange={handleChange} value={BPM} />
          <button type="button" data-id="BPM-increase" className="adjust-tempo-btn increase-tempo" onClick={handleClick}><span className="styleSpan">+</span></button>
        </div>
        <button type="button" data-id="start-stop" className="start-stop" onClick={handleClick}>{Start}</button>
        <div className="measures">
          <button type="button" data-id="subtract-beats" className="subtract-beats stepper" onClick={handleClick}>-</button>
          <div className="measure-count">{Metrica}</div>
          <button type="button" data-id="add-beats" className="add-beats stepper" onClick={handleClick}>+</button>
        </div>
        <div className="beats-per-measure-text">Metrica</div>
        <input type="checkbox" onChange={(e) => setBit(e.target.checked)} />
      </div>
    </div>
  )
}

export default App
