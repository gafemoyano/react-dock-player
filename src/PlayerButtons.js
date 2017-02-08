import React, {PropTypes} from 'react';
import cx from 'classnames'
import PodcastArrow from './assets/icons/podcast-arrow.svg';

const PlayerButtons = ({
  isPaused,
  isPlaying,
  isLoading,
  onPlayPause,
  onIncrement,
  onDecrement,
}) => {
  const playButtonClasses = cx(
    'podcast-player-button',
    'podcast-player-button--play',
    'js-player-play-button',
    {'is-paused': isPaused},
    {'is-playing': isPlaying},
    {'is-loading': isLoading},
  )
  return (
    <div className="podcast-player_buttons">
      <button
        className="podcast-player-button podcast-player-button--episode js-player-prev-button"
        title="Listen to the previous episode">
        <span
          className="js-player-prev-number">
        </span>
        <img src={PodcastArrow} alt="Previous episode"/>
      </button>
      <button
        className="podcast-player-button podcast-player-button--back15 js-player-back-button"
        title="Seek back 15 seconds"
        onClick={onDecrement.bind(15)}>
      </button>

      <button
        className={playButtonClasses}
        onClick={onPlayPause.bind(15)}>
      </button>

      <button
        className="podcast-player-button podcast-player-button--forward15 js-player-forward-button"
        title="Seek forward 15 seconds"
        onClick={onIncrement}>
      </button>
      <button className="podcast-player-button podcast-player-button--episode js-player-next-button" title="Listen to the next episode">
        <img
          className="flip-horizontal"
          src={PodcastArrow}
          alt="Next episode"
        />
          <span className="js-player-next-number"></span>
      </button>
    </div>
  )
};

PlayerButtons.propTypes = {
  isPaused: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onPlayPause: PropTypes.func.isRequired,
};

export default PlayerButtons;