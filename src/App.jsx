import React, { useState } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import './App.css';

// https://engineering.giphy.com/how-to-make-gifs-with-ffmpeg/
// https://stackoverflow.com/questions/15464896/get-cpu-gpu-memory-information
// https://stackoverflow.com/questions/45661913/vanilla-javascript-preview-video-file-before-upload-no-jquery
// https://github.com/ffmpegwasm/ffmpeg.wasm/blob/master/docs/api.md

function App() {
  const [videoSrc, setVideoSrc] = useState();
  const [outputSrc, setOutputSrc] = useState();
  // const [message, setMessage] = useState('Click Start to transcode');
  const ffmpeg = createFFmpeg({
    log: true,
  });
  const setInputVideo = ({ target: { files } }) => {
    console.log(files);
    // TODO: warn users of 2 GB file limit

    if (files && files.length) {
      setVideoSrc(files[0])
    }

  }


  const filter = "[0:v] fps=12,scale=w=480:h=-1,split [a][b];[a] palettegen [p];[b][p] paletteuse";

  const doTranscode = async () => {
    console.log("doTranscode");
    console.log('Loading ffmpeg-core.js');
    await ffmpeg.load();
    const inputName = videoSrc?.name || "";
    console.log('Start transcoding: ', inputName);
    if (videoSrc) {

      ffmpeg.FS('writeFile', inputName, await fetchFile(videoSrc));
    }

    await ffmpeg.run('-i', inputName, '-filter_complex', filter, 'output.gif');
    console.log('Complete transcoding');
    const data = ffmpeg.FS('readFile', 'output.gif');
    setOutputSrc(URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' })));
  };
  return (
    <div className="App">
      {/* <video src={ } /> */}
      <img src={outputSrc} />
      <input type="file" onChange={setInputVideo} />
      <button onClick={doTranscode}>Start</button>
    </div>
  );
}

export default App;