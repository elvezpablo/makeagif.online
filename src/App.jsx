import React, { useState } from 'react';
import styled from 'styled-components';
import MovieDrop from './MovieDrop';
import VideoPreview from './VideoPreview';
import Output from './Output';
import Settings from './Settings';
import {TRANSCODE, DEFAULTS, doTranscode} from "./makeagif/transcode";

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
  }

  const handleProgress = ({state, data}) => {
    const {  PROGRESS, COMPLETE } = TRANSCODE;
    setTranscodeState(state);    
    if (state === PROGRESS) {
      setTranscodeProgress(data);
    }
    if (state === COMPLETE) {
      setOutputSrc(data)
    }
  }

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
    <div>
      <Column>
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
    </div>
  );
};

export default App;
