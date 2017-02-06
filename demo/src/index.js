import React from 'react'
import {render} from 'react-dom'
import './normalize.css'
import DockPlayer from '../../src/'
import PlayButton from './PlayButton'
import Bloodflood from '../public/Bloodflood.mp3'
import art from '../public/an-awesome-wave.jpg'

class Demo extends React.Component {
  state = {
    audio: "",
    details: {
      song: "",
      artist: "",
      title: "",
      art: "",
    },
  }
  componentDidMount() {

  }
  handlePlay = (event, audio, details) => {
    event.preventDefault();
    this.setState({
      audio: Bloodflood,
      details: {
        song: "Bloodflood",
        artist: "Alt-J",
        title: "Week 1: Sound Explosion",
        art: art,
      },
    });
    this.player.play();
  }

  render() {
    const audioTitle = `${this.state.details.song} - ${this.state.details.artist}`;
    const playerTitle = this.state.details.title;
    const audioUrl = this.state.audio;
    const artUrl = this.state.details.art;
    return(
    <div>
      <h1>react-dock-player Demo</h1>
      <PlayButton
        onClick={this.handlePlay}
      />
      <DockPlayer
        ref={node => this.player = node}
        audioTitle={audioTitle}
        playerTitle={playerTitle}
        audioUrl={audioUrl}
        artUrl={artUrl}
      />
    </div>
    )
  }
}

render(<Demo/>, document.querySelector('#demo'))
