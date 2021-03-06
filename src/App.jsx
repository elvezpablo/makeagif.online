import React, { useState } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import MovieDrop from './components/MovieDrop';
import VideoPreview from './components/VideoPreview';
import Output from './components/Output';
import Settings from './components/Settings';
import Header from './components/Header';
import Progress from './components/Progress';
// import ClippingSlider from './components/ClippingSlider';
import Messaging from './components/Messaging';
import { TRANSCODE, doTranscode } from './makeagif/transcode';
import theme from './theme';

// Max size in chrome with this library
// https://github.com/ffmpegwasm/ffmpeg.wasm/issues/92
// bumped it to 2 GB
// dropping it back down to 6 MB
const _6MB = Math.pow(10, 6) * 20;
const MAX_FILE_SIZE = _6MB;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Quicksand', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    background: ${(props) => props.theme.colors.background};
  }
`;

const DEFAULTS = {
  maxSize: MAX_FILE_SIZE,
  fileTypes: ['video/mp4', 'video/avi', 'video/webm'],
};

const Button = styled.button`
  padding: 6px;
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes[3]};
  background-color: ${({ theme }) => theme.colors.primary};
  border: 2px;
  border-radius: 2px;
  border-style: solid;
  border-width: 1px;
  border-color: #bbb #aaa #999;
`;

const PreviewContainer = styled.div`
  position: relative;
`;

const Column = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const App = () => {
  const [videoMetadata, setVideoMetadata] = useState();
  const [outputSrc, setOutputSrc] = useState();
  const [transcodeState, setTranscodeState] = useState(TRANSCODE.PRELOAD);
  const [transcodeProgress, setTranscodeProgress] = useState(0);

  const handleFileDrop = (video) => {
    setVideoMetadata({
      ...DEFAULTS,
      size: video.size,
      name: video.name,
      type: video.type,
      src: video,
    });
  };

  const handleTranscode = () => {
    doTranscode(videoMetadata.name, videoMetadata.src, handleProgress);
  };

  const handleProgress = ({ state, data }) => {
    const { PROGRESS, COMPLETE } = TRANSCODE;
    
    setTranscodeState(state);
    if (state === PROGRESS) {
      console.log('app: ', state, 'data: ', data);
      setTranscodeProgress(data);
    }
    if (state === COMPLETE) {
      setOutputSrc(data);
    }
  };

  const handleOnLoad = (width, height, duration) => {
    setVideoMetadata({ ...videoMetadata, width, height, duration });
  };

  const handleSettingsChange = (settings) => {
    setVideoMetadata({ ...videoMetadata, ...settings });
  };

  const handleReset = (e) => {
    setOutputSrc(undefined);
    setTranscodeState(TRANSCODE.PRELOAD);
    setTranscodeProgress(0);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Column>
        <Header />
        {videoMetadata ? (
          <PreviewContainer>
            <VideoPreview videoSrc={videoMetadata.src} onLoad={handleOnLoad} />
            <Settings
              onChange={handleSettingsChange}
              settings={videoMetadata}
            />
          </PreviewContainer>
        ) : (
          <MovieDrop
            onFileDrop={handleFileDrop}
            maxSize={DEFAULTS.maxSize}
            fileTypes={DEFAULTS.fileTypes}
          />
        )}
        <Messaging isError={false} title="Welcome!" message="hello">
          {transcodeState >= TRANSCODE.LOADING &&
            transcodeState < TRANSCODE.COMPLETE && (
              <Progress value={transcodeProgress} />
            )}
        </Messaging>

        {transcodeState >= TRANSCODE.LOADING && (
          <Output outputSrc={outputSrc} videoName={videoMetadata.name} />
        )}

        {transcodeState === TRANSCODE.PRELOAD && videoMetadata && (
          <Button onClick={handleTranscode}>Start</Button>
        )}
        {transcodeState === TRANSCODE.COMPLETE && (
          <Button onClick={handleReset}>Reset</Button>
        )}
        {/* <Progress value={.9} /> */}
      </Column>
    </ThemeProvider>
  );
};

export default App;
