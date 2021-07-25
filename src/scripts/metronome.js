import {Howl} from 'howler';
import song from '../audio/click1.mp3'
import song2 from '../audio/click2.mp3'

const sound = new Howl({src:[song]})
const sound2 = new Howl({src:[song2]})
// const sound2 = new Howl({src:['../audio/click2.mp3']})

const play1 = () => {
  sound.play()
}

const play2 = () => {
  sound2.play()
}

export {play1, play2}