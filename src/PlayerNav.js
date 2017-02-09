import React, { PropTypes } from 'react';
import styled, {css} from 'styled-components';
import { tablet, black, halfWhite } from './style-variables';
import IconDown from './assets/icons/icon-down.svg';
import IconUp from './assets/icons/icon-up.svg';

const NavButton = styled.button`
  cursor: pointer;
  border: none;
  max-width: 100%;
  overflow-x: hidden;
  margin: 0;
  padding: 1rem;

  transition: background 0.1s ease-in-out 0s;
  background: ${black} center no-repeat;
  background-size: 10px;
  float: left;
  height: 50px;
  padding: 0;
  width: 50%;

  @media (min-width: ${tablet}px) {
    background-color: transparent;
    height: 22px;
    width: 42px;
  }
`;

const HideButton = styled(NavButton)`
  ${(props) => {
    if (props.isHidden) {
      return css`
        background-image: url("${IconUp}");
        background-color: rgba(18, 25, 33, 0.9);
        @media (min-width: ${tablet}px) {
          background-color: rgba(18, 25, 33, 0.9);
        }
    `;
    } else {
      return css`background-image: url("${IconDown}");`;
    }
  }}
`;

const PlayerNav = ({isHidden, togglePlayer, close}) => {
  return(
    <nav className="podcast-player_nav">
      <HideButton
        isHidden={isHidden}
        title="Toggle Player"
        onClick={togglePlayer} />
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
  isHidden: PropTypes.bool.isRequired,
  togglePlayer: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
}
export default PlayerNav;