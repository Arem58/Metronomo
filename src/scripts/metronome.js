import {Howl} from 'howler';
import song from '../audio/Audio.mp3'
import song2 from '../audio/Audio1.mp3'
import song3 from '../audio/Audio2.mp3'

const sound = new Howl({src:[song]})
const sound2 = new Howl({src:[song2]})
const sound3 = new Howl({src:[song3]})
//const sound11 = new Audio(song)
//const sound12 = new Audio(song2)
// const sound2 = new Howl({src:['../audio/click2.mp3']})

const play1 = () => {
  sound.play()
  //sound11.currentTime = 0
}

const play2 = () => {
  sound2.play()
  //sound12.currentTime = 0
}

const play3 = () => {
  sound3.play()
  //sound12.currentTime = 0
}

export {play1, play2, play3}