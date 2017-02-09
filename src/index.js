import './assets/sass/app.sass';
import cx from 'classnames';
import styled, { css } from 'styled-components';
import React, { Component, PropTypes } from 'react';
import AudioWrapper from './AudioWrapper';
import PlayerNav from './PlayerNav';
import PlayerDetails from './PlayerDetails';
import PlayerButtons from './PlayerButtons';
import PlayerSlider from './PlayerSlider';
import { tablet, white } from './style-variables';
const PlayerContainer = styled.div`
  display: flex;
  & *{
    box-sizing: border-box;
   }
  & *:focus{
    outline: none !important;
  }
  & button {
    cursor: pointer;
    border: none;
    max-width: 100%;
    overflow-x: hidden;
    margin: 0;
    padding: 1rem;
  }
`;

const Player = styled.figure`
  filter: blur(5px);
  opacity: 0;
  pointer-events: none;
  transition: all 0.1s ease-in-out 0s;
  transform: translateY(100%) scale(1.0001) translate3d(0, 0, 0);
  visibility: hidden;
  will-change: transform opacity;
  background: rgba(18, 25, 33, 0.95);
  bottom: 0;
  color: ${white};
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  position: fixed;
  width: 100%;
  z-index: 1000;
  @media (min-width: ${tablet}px) {
    flex-wrap: nowrap;
    align-items: center;
  }

  ${props => props.isActive &&
  css`
      filter: blur(0);
      opacity: 1;
      pointer-events: inherit;
      transform: translateY(0) scale(1) translate3d(0, 0, 0);
      visibility: visible;
    `}

    ${props => props.isHidden &&
  css`
    transform: translateY(100%) scale(1.0001);
  `}
`;
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
  };
  static defaultProps = {
    audioTitle: 'Audio Title',
    playerTitle: 'React Dock Player',
  };
  state = {
    audioLoaded: false,
    isActive: true,
    isHidden: false,
    isPaused: true,
    Art: PropTypes.string,
    isPlaying: false,
    isMuted: false,
    isLoading: false,
    isScrubbing: false,
    loop: false,
    defaultVolume: 0.5,
    trackDuration: 0,
    currentTime: 0,
    displayTime: 0,
    currentAudioTitle: '',
    detailsLoaded: false,
  };
  canPlay() {
    return this.audio.canPlay();
  }
  play = () => {
    this.setState({ isPaused: true, isPlaying: true });
  };
  pause = () => {
    this.setState({ isPaused: true, isPlaying: false });
  };
  handleLoadedData = duration => {
    this.setState({ trackDuration: duration });
  };
  handlePlayPause = () => {
    this.state.isPlaying ? this.pause() : this.play();
  };
  handleTimeUpdate = data => {
    if (!this.state.isScrubbing) {
      this.setState({
        trackDuration: data.trackDuration,
        displayTime: data.currentTime,
      });
    }
  };
  handlePlaybackEnd = () => {
    this.setState({
      isPaused: false,
      isPlaying: false,
      trackDuration: 0,
      currentTime: 0,
    });
  };
  handleProgress = data => {
    if (!this.state.isSeeking) {
      this.setState({ currentTime: data.currentTime });
    }
  };
  handleIncrement = interval => {
    this.setState({ currentTime: this.state.displayTime + 15 });
  };
  handleDecrement = interval => {
    this.setState({ currentTime: this.state.displayTime - 15 });
  };
  handleScrubberMouseDown = event => {
    this.setState({ isScrubbing: true });
  };
  handleScrubberMouseUp = event => {
    const newTime = event.target.value > 0
      ? parseInt(event.target.value, 10)
      : 0;
    this.setState({
      isScrubbing: false,
      currentTime: newTime,
    });
  };
  handleScrubberChange = event => {
    const seekedTime = event.target.value > 0
      ? parseInt(event.target.value, 10)
      : 0;
    this.setState({
      displayTime: seekedTime,
    });
  };

  close = () => {
    this.pause();
    this.setState({ isActive: false });
  };
  hide() {
    this.setState({
      isHidden: true,
      isPlaying: false,
      isPaused: true,
    });
  }
  show() {
    this.setState({
      isActive: true,
      isHidden: false,
    });
  }
  togglePlayer = () => {
    this.state.isHidden ? this.show() : this.hide();
  };
  render() {
    const playerClasses = cx(
      'podcast-player',
      'js-player',
      { 'podcast-player--is-active': this.state.isActive },
      { 'podcast-player--is-hidden': this.state.isHidden },
    );
    return (
      <PlayerContainer>
        <AudioWrapper
          ref={node => this.audio = node}
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
        <Player isActive={true} isHidden={this.state.isHidden}>
          <PlayerNav
            isHidden={this.state.isHidden}
            togglePlayer={this.togglePlayer}
            close={this.close}
          />
          <PlayerArt source={this.props.artUrl} />
          <PlayerDetails
            title={this.props.playerTitle}
            audioTitle={this.props.audioTitle}
          />
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
        </Player>
      </PlayerContainer>
    );
  }
}

const PlayerArt = ({ source }) => (
  <img
    className="podcast-player_art js-player-art"
    role="presentation"
    src={source}
  />
);

PlayerArt.propTypes = {
  source: PropTypes.string,
};
