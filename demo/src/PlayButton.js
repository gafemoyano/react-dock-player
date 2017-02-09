import React, {PropTypes} from 'react';
import PlayIcon from '../public/icon-play.svg';
import './play-button.css'

const styles = {
 backgroundImage: `url('${PlayIcon}')`
};

const PlayButton = ({onClick}) => {
  return(
      <div className="toolbar toolbar--dark">
        <a className="toolbar_item toolbar_item--button"
          data-play="/founderstalk/51/play"
          href="https://cdn.changelog.com/uploads/founderstalk/51/founders-talk-51.mp3"
          role="button"
          title="Play Song"
          style={styles}
          onClick={(e) => {
            e.preventDefault();
            onClick("next audio", "next url");
          }}>Play</a>
      </div>
  );
};

export default PlayButton;