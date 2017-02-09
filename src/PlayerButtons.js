import React, { PropTypes } from 'react';
import cx from 'classnames';
import PodcastArrow from './assets/icons/podcast-arrow.svg';
import styled, { css } from 'styled-components';
import { white, halfBlack, halfWhite, tablet } from './style-variables';
import ForwardIcon from './assets/icons/next-15.svg';
import BackIcon from './assets/icons/prev-15.svg';
import PlayIcon from './assets/icons/play.svg';
import PauseIcon from './assets/icons/pause.svg';
import LoadingIcon from './assets/icons/loading.svg';
import LoadingIcon2 from './assets/icons/loading-2.svg';

const Container = styled.div`
  width: 100%;
  padding: 1rem 0;
  display: flex;
  flex: 1 0 auto;
  justify-content: center;
  align-items: center;

  @media (min-width: ${tablet}px) {
    width: auto;
    padding: 0 1rem;
    flex: 0 0 auto;
  }
`;

const BaseButton = styled.button`
  background: rgba(18,25,33,.5) 50% no-repeat;
  border-radius: 200px;
  color: hsla(0,0%,100%,.5);
  padding: 0;
  height: 3.85rem;
  width: 3.85rem;
  display: flex;
  align-content: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  >img {
    display: block;
    margin: 0 0.5rem;
  }
  ${props => props.canPlay &&
  css`
    &:hover {
      filter: brightness(115%);
      color: ${white};
    }`}

`;

const PlayPostButton = styled(BaseButton)`
  background-color: transparent;
  justify-content: space-around;
  line-height: 1.25rem;
  > img {
    height: 1.25rem;
  }
  ${props => !props.canPlay &&
  css`
      filter: brightness(50%);
      cursor: default;`}
`;
const BackButton = styled(BaseButton)`
  height: 2.25rem;
  width: 2.25rem;
  margin: 0 0.5rem;
  background-image: url("${BackIcon}");
`;

const ForwardButton = styled(BaseButton)`
  height: 2.25rem;
  width: 2.25rem;
  margin: 0 0.5rem;
  background-image: url("${ForwardIcon}");
`;

const PlayButton = styled(PlayPostButton)`
  background: rgba(18,25,33,.5) 50% no-repeat;
  background-image: url("${PlayIcon}");
  background-size: 18px;
  ${props => props.isPlaying &&
  css`
    background-image: url("${PauseIcon}");
    background-size: auto;
  `}
  ${props => props.isLoading &&
  css`
    background-image: url("${LoadingIcon}");
    animation: spin 1s ease-in-out infinite;
    &:after {
      animation: spin 1s ease-in-out infinite;
      content: "";
      background: url("${LoadingIcon2}") center no-repeat;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  `}
`;

const PlayerButtons = (
  {
    isPaused,
    isPlaying,
    isLoading,
    prevPost,
    nextPost,
    onPlayPause,
    onIncrement,
    onDecrement,
    onLoadAudio,
  },
) => {
  return (
    <Container>
      <PlayPostButton
        canPlay={prevPost}
        title="Listen to the previous post"
        onClick={(e) => {
          e.preventDefault();
          prevPost && onLoadAudio(prevPost, prevPost);
        }}>
        <span>{prevPost && `#${prevPost}`}</span>
        <img src={PodcastArrow} alt="Previous post" />
      </PlayPostButton>
      <BackButton title="Seek back 15 seconds" onClick={onDecrement.bind(15)} />
      <PlayButton
        isPlaying={isPlaying}
        isPaused={isPaused}
        isLoading={isLoading}
        style={{padding: 0}}
        onClick={onPlayPause}
      />
      <ForwardButton title="Seek forward 15 seconds" onClick={onIncrement} />
      <PlayPostButton
        canPlay={nextPost} title="Listen to the next post"
        onClick={(e) => {
          e.preventDefault();
          nextPost && onLoadAudio(nextPost, nextPost);
        }}>
        <img
          src={PodcastArrow}
          alt="Next post"
          style={{ transform: 'scaleX(-1)' }}
        />
        <span>{nextPost && `#${nextPost}`}</span>
      </PlayPostButton>
    </Container>
  );
};

PlayerButtons.propTypes = {
  isPaused: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  prevPost: PropTypes.string,
  nextPost: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  onPlayPause: PropTypes.func.isRequired,
  onLoadAudio: PropTypes.func.isRequired,
};

export default PlayerButtons;
