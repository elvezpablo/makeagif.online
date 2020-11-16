import React, { useState } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import styled from "styled-components";
import MovieDrop from './MovieDrop';
import VideoPreview from "./VideoPreview";
import Output from "./Output";

const Progress = styled.progress`
   width: 100%;
`

const Column = styled.div`
  width: 480px;
  display: flex;
  flex-direction: column; 
  margin: 0 auto;
`

const TRANSCODE = {
  PRELOAD: -1,
  LOADING: 0,
  STARTED: 1,
  TRANSCODING: 2,
  COMPLETE: 3
}


const App = () => {
  const [videoSrc, setVideoSrc] = useState();
  const [outputSrc, setOutputSrc] = useState();
  const [transcodeState, setTranscodeState] = useState(TRANSCODE.PRELOAD);
  const [transcodeProgress, setTranscodeProgress] = useState(0);

  const ffmpeg = createFFmpeg({
    log: false,
  });

  const handleFileDrop = (video) => {
    setVideoSrc(video)
  }

  ffmpeg.setProgress(({ ratio }) => {
    setTranscodeProgress(ratio);
  });

  const filter = "[0:v] fps=12,scale=w=480:h=-1,split [a][b];[a] palettegen [p];[b][p] paletteuse";

  const doTranscode = async () => {
    setTranscodeState(TRANSCODE.LOADING);
    await ffmpeg.load();
    setTranscodeState(TRANSCODE.STARTED);
    const inputName = videoSrc?.name || "";
    ffmpeg.FS('writeFile', inputName, await fetchFile(videoSrc));
    setTranscodeState(TRANSCODE.TRANSCODING);
    // await ffmpeg.run('-i', inputName, '-filter_complex', filter, '-loop', '-1', 'output.gif');
    await ffmpeg.run('-i', inputName, '-filter_complex', filter, 'output.gif');
    const data = ffmpeg.FS('readFile', 'output.gif');
    setOutputSrc(URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' })));
    setTranscodeState(TRANSCODE.COMPLETE);
  };

  const handleReset = (e) => {
    setOutputSrc(undefined);
    setTranscodeState(TRANSCODE.PRELOAD);
    setTranscodeProgress(0);
  }

  return (
    <div>
      <Column>
        {videoSrc ?
          <VideoPreview videoSrc={videoSrc} /> :
          <MovieDrop onFileDrop={handleFileDrop} />}
        {transcodeState >= 0 && <Output outputSrc={outputSrc} videoSrc={videoSrc} />}
        {transcodeState === -1 && <button disabled={!videoSrc} onClick={doTranscode}>Start</button>}
        {transcodeState >= 0 && transcodeState < 3 && <Progress value={transcodeProgress} />}
        {transcodeState === 3 && <button onClick={handleReset}  >Reset</button>}

      </Column>
    </div>
  );
}

export default App;