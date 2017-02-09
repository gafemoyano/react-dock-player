import React, { PropTypes } from 'react';
import styled, { css } from 'styled-components';
import { tablet, black } from './style-variables';
import IconDown from './assets/icons/icon-down.svg';
import IconUp from './assets/icons/icon-up.svg';
import IconClose from './assets/icons/icon-close.svg';

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
  ${props => {
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

const CloseButton = styled(NavButton)`
  background-image: url("${IconClose}");
  ${props => {
  if (props.isHidden) {
    return css`
        background-color: rgba(18, 25, 33, 0.9);
        @media (min-width: ${tablet}px) {
          background-color: rgba(18, 25, 33, 0.9);
        }
    `;
  }
}}
`;

const NavContainer = styled.nav`
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;

  @media (min-width: ${tablet}px){
    transition: all 0.1s ease-in-out 0s;
    will-change: transform;
    position: absolute;
    left: auto;
    right: 0;
    bottom: auto;
    top: 6px;
  }

  ${props => {
  if (props.isHidden) {
    return css`
        @media (min-width: ${tablet}px) {
          top: 0;
          transform: translateY(-100%);
          transition-delay: 0.3s;
        }
    `;
  }
}}
`;

const PlayerNav = ({ isHidden, togglePlayer, close }) => {
  return (
    <NavContainer isHidden={isHidden}>
      <HideButton
        isHidden={isHidden}
        title="Toggle Player"
        onClick={togglePlayer}
      />
      <CloseButton isHidden={isHidden} title="Close Player" onClick={close} />
    </NavContainer>
  );
};

PlayerNav.propTypes = {
  isHidden: PropTypes.bool.isRequired,
  togglePlayer: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};
export default PlayerNav;
