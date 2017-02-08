import React, { PropTypes } from 'react';


const PlayerNav = ({togglePlayer, close}) => {
  return(
    <nav className="podcast-player_nav">
      <button
        className="podcast-player_nav_button podcast-player_nav_button--hide js-player-hide"
        title="Toggle Player"
        onClick={togglePlayer}>
        </button>
      <button
        className="podcast-player_nav_button podcast-player_nav_button--close js-player-close"
        title="Close Player"
        onClick={close}>
      </button>
    </nav>
  );
};

PlayerNav.propTypes = {
  togglePlayer: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
}
export default PlayerNav;