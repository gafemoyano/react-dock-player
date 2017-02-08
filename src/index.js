import './assets/sass/app.sass'
// import './player.css'
import cx from 'classnames'
import React, { Component, PropTypes } from 'react'
import AudioWrapper from "./AudioWrapper";
import PlayerNav from './PlayerNav';
import PlayerDetails from './PlayerDetails';
import PlayerButtons from './PlayerButtons';
import PlayerSlider from './PlayerSlider';

export default class DockPlayer extends Component {
  static propTypes = {
    audioTitle: PropTypes.string,
    playerTitle: PropTypes.string,
    artUrl: PropTypes.string,
    audioUrl: PropTypes.string,
    nextAudioUrl: PropTypes.string,
    nextAudioTitle: PropTypes.string,
    prevAudioUrl: PropTypes.string,
    prevAudioTitle: PropTypes.string,
  }
  static defaultProps = {
    audioTitle: "Audio Title",
    playerTitle: "React Dock Player",
  }
  state = {
    audioLoaded: false,
    isActive: true,
    isHidden: false,
    isPaused: true,Art: PropTypes.string,
    isPlaying: false,
    isMuted: false,
    isLoading: false,
    isScrubbing: false,
    loop: false,
    defaultVolume: 0.5,
    trackDuration : 0,
    currentTime: 0,
    displayTime: 0,
    currentAudioTitle: "",
    detailsLoaded: false,
  }
  canPlay() {
    return this.audio.canPlay()
  }
  play = () => {
    this.setState({isPaused: true, isPlaying: true});
  }
  pause = () => {
    this.setState({isPaused: true, isPlaying: false});
  }
  handleLoadedData = (duration) => {
    this.setState({trackDuration: duration});
  }
  handlePlayPause = () => {
    this.state.isPlaying ? this.pause() : this.play();
  }
  handleTimeUpdate = (data) => {
    if(!this.state.isScrubbing){
      this.setState({
        trackDuration: data.trackDuration,
        displayTime: data.currentTime,
      });
    }
  }
  handlePlaybackEnd = () => {
    this.setState({
      isPaused: false,
      isPlaying: false,
      trackDuration : 0,
      currentTime: 0,
    });
  }
  handleProgress = (data) => {
    if (!this.state.isSeeking) {
      this.setState({currentTime: data.currentTime})
    }
  }
  handleIncrement = (interval) => {
    this.setState({currentTime: this.state.displayTime + 15});
  }
  handleDecrement = (interval) => {
    this.setState({currentTime: this.state.displayTime - 15});
  }
  handleScrubberMouseDown = event => {
    this.setState({isScrubbing: true});
  }
  handleScrubberMouseUp = (event) => {
    const newTime = event.target.value > 0 ? parseInt(event.target.value, 10) : 0;
    this.setState({
      isScrubbing: false,
      currentTime: newTime,
    });
  }
  handleScrubberChange = (event) => {
    const seekedTime = event.target.value > 0 ? parseInt(event.target.value, 10) : 0;
    this.setState({
      displayTime: seekedTime,
    });
  }

  close = () => {
    this.pause();
    this.setState({isActive: false});
  }
  hide() {
    this.setState({
      isHidden: true,
      isPlaying: false,
      isPaused: true,
    });
  }
  show() {
    this.setState({
      isActive:true,
      isHidden: false,
    });
  }
  togglePlayer = () => {
    this.state.isHidden ? this.show() : this.hide();
  }
  render () {
    const playerClasses = cx(
      'podcast-player',
      'js-player',
      {'podcast-player--is-active': this.state.isActive},
      {'podcast-player--is-hidden': this.state.isHidden},
    );
    return (
      <div className="player-container">
        <AudioWrapper
          ref={ node => this.audio = node}
          source={this.props.audioUrl}
          isPlaying={this.state.isPlaying}
          isMuted={this.state.isMuted}
          isLoading={this.state.isLoading}
          isScrubbing={this.state.isScrubbing}
          loop={this.state.loop}
          currentTime={this.state.currentTime}
          defaultVolume={this.state.defaultVolume}
          onProgress={this.handleProgress}
          onTimeUpdate={this.handleTimeUpdate}
          onEnd={this.handlePlaybackEnd}
          onLoadedData={this.handleLoadedData}
          onSeeking={this.handleSeeking}
          onSeeked={this.handleSeeked}
        />
        <div id="player">
          <figure className={playerClasses}>
              <PlayerNav
              togglePlayer={this.togglePlayer}
              close={this.close}
              />
              <PlayerArt source={this.props.artUrl} />
              <PlayerDetails
              title={this.props.playerTitle}
              audioTitle={this.props.audioTitle} />
              <PlayerButtons
              isPaused={this.state.isPaused}
              isPlaying={this.state.isPlaying}
              isLoading={this.state.isLoading}
              onPlayPause={this.handlePlayPause}
              onIncrement={this.handleIncrement}
              onDecrement={this.handleDecrement}
              />
              <PlayerSlider
              trackDuration={this.state.trackDuration}
              currentTime={this.state.displayTime}
              title={this.props.playerTitle}
              audioTitle={this.props.audioTitle}
              onScrubberChange={this.handleScrubberChange}
              onMouseDown={this.handleScrubberMouseDown}
              onMouseUp={this.handleScrubberMouseUp}
              />
          </figure>
        </div>
      </div>
    );
  }
}


const PlayerArt = ({source}) => (
  <img
    className="podcast-player_art js-player-art"
    role="presentation"
    src={source} />
)

PlayerArt.propTypes = {
  source: PropTypes.string,
}