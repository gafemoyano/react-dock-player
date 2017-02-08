import React, { PropTypes } from 'react';
import styled from 'styled-components'
import { formatTime } from './utils';
import { white, halfWhite, black } from './style-variables';

const rangeWidth = '100% !default';
const rangeHandleColor =  `${white} !default`;
const rangeHandleColorHover = `${white} !default`;
const rangeHandleSize = '18px !default';
const rangeTrackColor = `${black} !default`;
const rangeTrackHeight = '2px !default';
const rangeLabelColor = `${halfWhite} !default`;
const rangeLabelWidth = '60px !default';

const sliderThumb = `
    -webkit-appearance: none;
    width: ${rangeHandleSize};
    height: ${rangeHandleSize};
    border: none;
    border-radius: ${rangeHandleSize};
    background: ${rangeHandleColor};
    cursor: pointer;
    transition: background .15s ease-in-out;
    position: relative;
    top: -8px;

    &:hover{
      background: ${rangeHandleColorHover};
    }
    &:active{
      background: ${rangeHandleColorHover};
    }
`;

const sliderTrack = `
  -webkit-appearance: none
  width: ${rangeWidth}
  height: ${rangeTrackHeight}
  cursor: pointer
  animate: 0.2s
  background: ${rangeTrackColor}
  border-radius: 1px
  border: none
  margin: 8px 0
`;

const InputRange = styled.input`
  webkit-appearance: none;
  background: none;
  display: block;
  position: relative;
  outline: none;
  padding: 0;
  margin: 0;
  width: ${rangeWidth};

  &::-moz-range-track{
    ${sliderTrack}
  }
  &::-ms-track{
    ${sliderTrack}
  }
  &::-webkit-slider-runnable-track{
    ${sliderTrack}
  }

  &::-moz-range-thumb{
    ${sliderThumb}
  }
  &::-ms-thumb{
    ${sliderThumb}
  }
  &::-webkit-slider-thumb{
    ${sliderThumb}
  }
`;

const PlayerSlider = ({
  trackDuration,
  currentTime,
  title,
  audioTitle,
  onScrubberChange,
  onMouseDown,
  onMouseUp,
}) => {

  const roundedCurrentTime = Math.round(currentTime || 0)
  const percentComplete = roundedCurrentTime / trackDuration * 100
  const formattedCurrentTime = formatTime(currentTime | 0)
  const formattedDuration = formatTime(trackDuration| 0)
  return (
    <form className="podcast-player_slider">
      <div className="range-slider">
        <span className="range-slider_above">
          <span className="js-player-now-playing">{title}</span>
        </span>
        <div className="range-slider_range_wrap">
          <InputRange
            className="range-slider_range js-player-scrubber"
            type="range"
            value={roundedCurrentTime}
            onChange={onScrubberChange}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            min="0"
            max={trackDuration}/>
          <div
            className="range-slider_range_track js-player-track"
            style={{width: `${percentComplete}%`}}
          >
          </div>
        </div>
        <span className="range-slider_below">
          <span className="js-player-title">{audioTitle}</span>
          <output>
            <b className="js-player-current">{formattedCurrentTime}</b> /
            <span className="js-player-duration"> {formattedDuration}</span>
          </output>
        </span>
      </div>
    </form>
  );
};

PlayerSlider.propTypes = {
  trackDuration: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
  onScrubberChange: PropTypes.func.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onMouseUp: PropTypes.func.isRequired,
};

export default PlayerSlider;