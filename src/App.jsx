import React, { useState } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import MovieDrop from './components/MovieDrop';
import VideoPreview from './components/VideoPreview';
import Output from './components/Output';
import Settings from './components/Settings';
import Header from './components/Header';
import { TRANSCODE, doTranscode } from './makeagif/transcode';
import theme from './theme';

// Max size in chrome with this library
// https://github.com/ffmpegwasm/ffmpeg.wasm/issues/92
// bumped it to 2 GB
const MAX_FILE_SIZE = Math.pow(1024, 9) * 2;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Quicksand', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    background: ${props => props.theme.colors.background};
    /* background-color: #00004f;
    background-image: linear-gradient(rgba(25, 70, 91, 0.5) 1px, transparent 1px), linear-gradient(#19465b 1px, transparent 1px), linear-gradient(90deg, rgba(25, 70, 91, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(25, 70, 91, 0.7) 1px, transparent 1px), linear-gradient(transparent 3px, #00004f 3px, #00004f 58px, transparent 58px), linear-gradient(90deg, rgba(25, 70, 91, 0.7) 3px, transparent 3px, transparent 58px, rgba(25, 70, 91, 0.7) 58px);
    background-size: 15px 15px, 60px 60px, 15px 15px, 60px 60px, 60px 60px, 60px 60px; */
  }
`;

const DEFAULTS = {
  maxSize: MAX_FILE_SIZE,
  fileTypes: 'video/mp4',
};

const Progress = styled.progress`
  width: 100%;
`;
const Column = styled.div`
  width: 480px;
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
          <>
            <VideoPreview videoSrc={videoMetadata.src} onLoad={handleOnLoad} />
            <Settings
              onChange={handleSettingsChange}
              settings={videoMetadata}
            />
          </>
        ) : (
          <MovieDrop
            onFileDrop={handleFileDrop}
            maxSize={DEFAULTS.maxSize}
            fileTypes={DEFAULTS.fileTypes}
          />
        )}

        {transcodeState >= TRANSCODE.LOADING && (
          <Output outputSrc={outputSrc} videoName={videoMetadata.name} />
        )}
        {transcodeState === TRANSCODE.PRELOAD && (
          <button disabled={!videoMetadata} onClick={handleTranscode}>
            Start
          </button>
        )}
        {transcodeState >= TRANSCODE.LOADING &&
          transcodeState < TRANSCODE.COMPLETE && (
            <Progress value={transcodeProgress} />
          )}
        {transcodeState === TRANSCODE.COMPLETE && (
          <button onClick={handleReset}>Reset</button>
        )}
      </Column>
    </ThemeProvider>
  );
};

export default App;
