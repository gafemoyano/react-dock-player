import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { tablet } from './style-variables';
const Details = styled.div`
  background: rgba(18, 25, 33, 0.5);
  display: flex;
  flex: 1 1 auto;
  padding: 1em 0;
  justify-content: space-between;
  max-width: 100%;
  min-height: 5rem;

  @media (min-width: 415px) {
    padding-left: 5rem;
  }

  @media (min-width: ${tablet}px){
    background: none;
    flex: 0 0 auto;
    order: 4;
    padding-left: 0;
  }
`;

const DetailsTitle = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 1rem;
  min-width: 0;
  max-width: 100%;

  @media(min-width: ${tablet}px) {
    display: none;
  }
  & > span, & > figcaption {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  & > span {
    text-transform: uppercase;
    font-weight: 400;
    letter-spacing: 1.3px;
    font-family: "Arial Narrow", sans-serif;
  }
  & > figcaption {
    font-weight: 500;
    font-size: 1.25em;
  }
`;

const PlayerDetails = ({title, audioTitle}) => {
  return (
    <Details>
      <DetailsTitle>
        <span>
          {title}
        </span>
        <figcaption>
          {audioTitle}
        </figcaption>
      </DetailsTitle>
    </Details>
  );
};

PlayerDetails.propTypes = {
  playerTitle: PropTypes.string,
  audioTitle: PropTypes.string,
};

export default PlayerDetails;