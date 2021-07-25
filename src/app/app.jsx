import React, { useState, useEffect } from 'react'
import '../styles/Metronome.css'
import {play1, play2} from '../scripts/metronome'
//import Timer from '../scripts/timer'

const App = () => {
  const [BPM, setBPM] = useState(140)
  const [Metrica, setMetrica] = useState(4)
  const [Tempo, setTempo] = useState('Nice and Steady')
  const [Start, setStart] = useState('START')
  const [clicked, setClicked] = useState(false)
  let count = 0
  let metrica = Metrica

  function playsound (){
    const temp = metrica
    if (count === temp){
      count = 0
    }
    if (count === 0){
      play1()
    }else{
      play2()
    }
    count += 1
    //console.log(count)
  }

  function Timer(callback, timeInterval, options) {
    this.timeInterval = timeInterval;

    useEffect(() => {
      if(clicked){
      // Set the expected time. The moment in time we start the timer plus whatever the time interval is. 
        this.expected = Date.now() + this.timeInterval;
        // Start the timeout and save the id in a property, so we can cancel it later
        this.theTimeout = null;
        
        if (options.immediate) {
          callback();
        } 
        
        console.log('hola')

        this.timeout = setTimeout(this.round, this.timeInterval);
        //console.log('Timer Started');

        return () => {
          clearTimeout(this.timeout);
          //console.log('Timer Stopped');
        }
      }
    }, [clicked])
    // Round method that takes care of running the callback and adjusting the time
    this.round = () => {
      console.log(metrica)

      //console.log('timeout', this.timeout);
      // The drift will be the current moment in time for this round minus the expected time..
      let drift = Date.now() - this.expected;
      // Run error callback if drift is greater than time interval, and if the callback is provided
      if (drift > this.timeInterval) {
        // If error callback is provided
        if (options.errorCallback) {
          options.errorCallback();
        }
      }
      callback();
      // Increment expected time by time interval for every round after running the callback function.
      this.expected += this.timeInterval;
      //console.log('Drift:', drift);
      //console.log('Next round time interval:', this.timeInterval - drift);
      // Run timeout again and set the timeInterval of the next iteration to the original time interval minus the drift.
      this.timeout = setTimeout(this.round, this.timeInterval - drift);
    }
  }

  const metro = new Timer(() => playsound(), 60000/BPM, {immediate: true})

  const setTempoText = () => {
    if (BPM <= 40) { setTempo('Super Slow') }
    if (BPM > 40 && BPM < 80) { setTempo('Slow') }
    if (BPM > 80 && BPM < 120) { setTempo('Getting there') }
    if (BPM > 120 && BPM < 180) { setTempo('Nice and Steady') }
    if (BPM > 180 && BPM < 220) { setTempo("Rock n' Roll") }
    if (BPM > 220 && BPM < 240) { setTempo('Funky Stuff') }
    if (BPM > 240 && BPM < 260) { setTempo('Relax Dude') }
    if (BPM > 260 && BPM <= 280) { setTempo('Eddie Van Halen') }
  }

  const handleClick = (event) => {
    if (event.currentTarget.dataset.id === 'BPM-decrease') {
      if (BPM === 20) {
        return
      }
      setBPM(BPM - 1)
      setTempoText()
      play1()
    } if (event.currentTarget.dataset.id === 'BPM-increase') {
      if (BPM === 280) {
        return
      }
      setBPM(BPM + 1)
      setTempoText()
    } if (event.currentTarget.dataset.id === 'subtract-beats') {
      if (Metrica === 2) {
        return
      }
      setMetrica(Metrica - 1)
      metrica -= 1
    } if (event.currentTarget.dataset.id === 'add-beats') {
      if (Metrica === 7) {
        return
      }
      setMetrica(Metrica + 1)
      metrica += 1
      console.log(metrica)
    } if (event.currentTarget.dataset.id === 'start-stop') {
      if (clicked === false) {
        setStart('STOP')
        setClicked(true)
        console.log(count)
      } else if (clicked === true) {
        setStart('START')
        setClicked(false)
        console.log(count)
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
          <button type="button" data-id="BPM-decrease" className="adjust-tempo-btn decrease-tempo" onClick={handleClick}><span className="styleSpan">-</span></button>
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
      </div>
    </div>
  )
}

export default App
