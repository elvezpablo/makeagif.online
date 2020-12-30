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
// dropping it back down to 6 MB 
const _6MB = Math.pow(10, 6) * 20
const MAX_FILE_SIZE = _6MB;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Quicksand', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    background: ${props => props.theme.colors.background};
  }
`;

const DEFAULTS = {
  maxSize: MAX_FILE_SIZE,
  fileTypes: 'video/mp4',
};

const Progress = styled.progress`
  width: 100%;
  background-color: #eee;
  border-radius: 5px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.25) inset;  
`;

const Button = styled.button`
  padding: 6px;
  
  
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

  const DevContainer = styled.div`
    
  
  `;

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
        {transcodeState === TRANSCODE.PRELOAD && videoMetadata && (
          <Button onClick={handleTranscode}>Start</Button>
        )}
        {transcodeState >= TRANSCODE.LOADING &&
          transcodeState < TRANSCODE.COMPLETE && (
            <Progress value={transcodeProgress} />
          )}
        {transcodeState === TRANSCODE.COMPLETE && (
          <Button onClick={handleReset}>Reset</Button>
        )}
        
      </Column>
    </ThemeProvider>
  );
};

export default App;
