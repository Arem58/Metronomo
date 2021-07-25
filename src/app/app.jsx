import React, { useState } from 'react'
import '../styles/Metronome.css'
import {play1, play2} from '../scripts/metronome'

const App = () => {
  const [BPM, setBPM] = useState(140)
  const [Metrica, setMetrica] = useState(4)
  const [Tempo, setTempo] = useState('Nice and Steady')
  const [Start, setStart] = useState('START')
  const [clicked, setClicked] = useState(0)

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
      play2()
    } if (event.currentTarget.dataset.id === 'BPM-increase') {
      if (BPM === 280) {
        return
      }
      setBPM(BPM + 1)
      setTempoText()
      play1()
    } if (event.currentTarget.dataset.id === 'subtract-beats') {
      if (Metrica === 2) {
        return
      }
      setMetrica(Metrica - 1)
    } if (event.currentTarget.dataset.id === 'add-beats') {
      if (Metrica === 7) {
        return
      }
      setMetrica(Metrica + 1)
    } if (event.currentTarget.dataset.id === 'start-stop') {
      if (clicked === 0) {
        setStart('STOP')
        setClicked(1)
      } else if (clicked === 1) {
        setStart('START')
        setClicked(0)
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
