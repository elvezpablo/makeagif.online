import React from 'react';
import styled from 'styled-components';
import { formatBytes } from '../formatters';

const Spinner = () => {
  return (
    <svg
      version="1.1"
      x="0px"
      y="0px"
      width="40px"
      height="40px"
      viewBox="0 0 40 40"
      enableBackground="new 0 0 40 40"
      space="preserve"
    >
      <path
        opacity="0.2"
        fill="#000"
        d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946 s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634 c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
      />
      <path
        fill="#000"
        d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0 C22.32,8.481,24.301,9.057,26.013,10.047z"
      >
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="rotate"
          from="0 20 20"
          to="360 20 20"
          dur="0.5s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
};

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  margin-top: 8px;
  border-width: 1px;
  border-radius: 2px;
  border-color: rgba(200, 200, 200, 0.5);
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.6);
  border-style: solid;
  padding: 2px;
  text-align: center;
  svg path {
    fill: ${({ theme }) => theme.colors.primary};
  }
`;

const OutputGif = styled.img`
  max-width: 596px;
`;

const Header = styled.h4`
  margin: 8px 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.heading};
`;

const Metadata = styled.div`
  color: ${({ theme }) => theme.colors.textLight};
`;

const Output = ({ outputSrc, videoName }) => {
  const name = videoName.replace(/[^.]+$/, 'gif');
  let outputURL
  if(outputSrc) {
    outputURL = URL.createObjectURL(outputSrc);
  }

  return (
    <>
      <Header>{`Output GIF: ${name}`}</Header>
      {outputSrc && (
        <Metadata>{`Size: ${formatBytes(outputSrc.size)} Type: ${
          outputSrc.type
        }`}</Metadata>
      )}
      <Container>
        {outputSrc ? (
          <a href={outputURL} download={name}>
            <OutputGif
              onLoad={(e) => {
                console.log(e.target.naturalWidth);
              }}
              src={outputURL}
            />
          </a>
        ) : (
          <Spinner />
        )}
      </Container>
    </>
  );
};

export default Output;
