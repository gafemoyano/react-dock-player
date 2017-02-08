import React, { PropTypes } from 'react';
import styled from 'styled-components'
import { formatTime } from './utils';
import { white, halfWhite, black, tablet } from './style-variables';

const rangeWidth = '100%';
const rangeHandleColor =  `${white}`;
const rangeHandleColorHover = `${white}`;
const rangeHandleSize = '18px';
const rangeTrackColor = `${black}`;
const rangeTrackHeight = '2px';
const rangeLabelColor = `${halfWhite}`;
const rangeLabelWidth = '60px';

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
  -webkit-appearance: none;
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
const SliderTrack = styled.div`
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  background: ${white};
  height: ${rangeTrackHeight};
  border-radius: 1px;
  width: 0%;
  margin-top: -1px;
`;

const BelowSection = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.span`
  display: none;
  font-size: 1.15em;
  font-weight: 900;

  @media (min-width: ${tablet}px) {
    display: inline;
  }
`
const CurrentTime = styled.output`
  margin-left: auto;
  text-align: right;
  color: ${halfWhite};
  font-size: 0.75em;

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

  const roundedCurrentTime = Math.round(currentTime || 0);
  const percentComplete = roundedCurrentTime / trackDuration * 100;
  const formattedCurrentTime = formatTime(currentTime | 0);
  const formattedDuration = formatTime(trackDuration| 0);

  return (
    <form className="podcast-player_slider">
      <div className="range-slider">
        <span className="range-slider_above">
          <span className="js-player-now-playing">{title}</span>
        </span>
        <div className="range-slider_range_wrap">
          <InputRange
            type="range"
            value={roundedCurrentTime}
            onChange={onScrubberChange}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            min="0"
            max={trackDuration}/>
          <SliderTrack style={{width: `${percentComplete}%`}} />
        </div>
        <BelowSection>
          <Title>{audioTitle}</Title>
          <CurrentTime>
            <b style={{fontWeight: 400, color: white}}>{formattedCurrentTime}</b> /
            <span> {formattedDuration}</span>
          </CurrentTime>
        </BelowSection>
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