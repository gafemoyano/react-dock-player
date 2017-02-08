import React, { PropTypes } from 'react';

const PlayerDetails = ({title, audioTitle}) => {
  return (
    <div className="podcast-player_details">
      <div className="podcast-player_details_title">
        <span className="js-player-now-playing">
          {title}
        </span>
        <figcaption className="js-player-title">
          {audioTitle}
        </figcaption>
      </div>
    </div>
  );
};

PlayerDetails.propTypes = {
  playerTitle: PropTypes.string,
  audioTitle: PropTypes.string,
};

export default PlayerDetails;