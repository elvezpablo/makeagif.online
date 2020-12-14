import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

// Max size in chrome with this library
// https://github.com/ffmpegwasm/ffmpeg.wasm/issues/92
const MAX_FILE_SIZE = Math.pow(10, 6) * 261;

const DEFAULTS = {
  fps: 12,
  ratioLocked: true,
  width: 480,
  log: false,
  loop: true,
  maxSize: MAX_FILE_SIZE,
  fileTypes: 'video/mp4',
  tmpOutput: 'output.gif',
};

const TRANSCODE = {
  LOADING: 1,
  STARTED: 2,
  PROGRESS: 3,
  TRANSCODING: 4,
  COMPLETE: 5,
  ERROR: 10
};

const generateFilter = (fps = DEFAULTS.fps, width = DEFAULTS.width) => {
  return `[0:v] fps=${fps},scale=w=${width}:h=-1,split [a][b];[a] palettegen [p];[b][p] paletteuse`;
};

const ffmpeg = createFFmpeg({
  log: DEFAULTS.log,
});


const doTranscode = async (
  name,
  src,
  setProgress,
) => {
  ffmpeg.setProgress(({ ratio }) => {
    // setTranscodeProgress(ratio);
    setProgress({state: TRANSCODE.PROGRESS, data: ratio});
  });

  const filter = generateFilter();

  // setTranscodeState(TRANSCODE.LOADING);
  setProgress({ state: TRANSCODE.LOADING });
  if(!ffmpeg.isLoaded()) {
    await ffmpeg.load();
  }
  
  // setTranscodeState(TRANSCODE.STARTED);
  setProgress({ state: TRANSCODE.STARTED });

  ffmpeg.FS('writeFile', name, await fetchFile(src));
  // setTranscodeState(TRANSCODE.TRANSCODING);
  setProgress({ state: TRANSCODE.TRANSCODING });
  // await ffmpeg.run('-i', inputName, '-filter_complex', filter, '-loop', '-1', 'output.gif');
  await ffmpeg.run('-i', name, '-filter_complex', filter, DEFAULTS.tmpOutput);
  const data = ffmpeg.FS('readFile', DEFAULTS.tmpOutput);

  const output = URL.createObjectURL(
    new Blob([data.buffer], { type: 'video/mp4' }),
  );
  
  setProgress({ state: TRANSCODE.COMPLETE, data: output });
};

export { TRANSCODE, DEFAULTS, doTranscode };
