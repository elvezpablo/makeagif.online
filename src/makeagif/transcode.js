import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

// TODO: add more options
// https://medium.com/@colten_jackson/doing-the-gif-thing-on-debian-82b9760a8483

const DEFAULTS = {
  fps: 12,
  ratioLocked: true,
  width: 600,
  log: false,
  loop: true,
  tmpOutput: 'output.gif',
};

const TRANSCODE = {
  PRELOAD : 0,
  LOADING: 1,
  STARTED: 2,
  TRANSCODING: 3,
  PROGRESS: 4,
  COMPLETE: 5,
  ERROR: 100
};

// https://stackoverflow.com/questions/46060013/how-to-add-watermark-in-a-gif-with-ffmpeg
/*
ffmpeg -i in.mp4 -i watermark.png -filter_complex "[0]fps=10,scale=320:-1:flags=lanczos[bg];[bg][1]overlay=W-w-5:H-h-5,palettegen" palette.png
ffmpeg -i in.mp4 -i watermark.png -i palette.png -filter_complex "[0]fps=10,scale=320:-1:flags=lanczos[bg];[bg][1]overlay=W-w-5:H-h-5[x];[x][2]paletteuse=dither=bayer:bayer_scale=3" output.gif
*/

/*
cropping
*/

/*
Fluent FFMPEG
https://github.com/fluent-ffmpeg/node-fluent-ffmpeg
*/

const gifFilter = (fps = DEFAULTS.fps, width = DEFAULTS.width) => {
  return `[0:v] fps=${fps},scale=w=${width}:h=-1,split [a][b];[a] palettegen [p];[b][p] paletteuse`;
};

const ffmpeg = createFFmpeg({
  log: DEFAULTS.log,
  corePath: '/core/ffmpeg-core.js',
});


const doTranscode = async (
  name,
  src,
  setProgress,
) => {
  
  ffmpeg.setProgress(({ ratio }) => setProgress({state: TRANSCODE.PROGRESS, data: ratio}));

  const filter = gifFilter();
  console.log("loading: ");
  setProgress({ state: TRANSCODE.LOADING });
  if(!ffmpeg.isLoaded()) {
    await ffmpeg.load();
  }
  
  setProgress({ state: TRANSCODE.STARTED });
  try {  
    ffmpeg.FS('writeFile', name, await fetchFile(src));
    setProgress({ state: TRANSCODE.TRANSCODING });    
    await ffmpeg.run('-i', name, '-filter_complex', filter, DEFAULTS.tmpOutput);
    const data = ffmpeg.FS('readFile', DEFAULTS.tmpOutput);

    const blob = new Blob([data.buffer], { type: 'image/gif' });
    
    setProgress({ state: TRANSCODE.COMPLETE, data: blob });
  } catch (err) {
    console.log("error: ", err);
    setProgress({ state: TRANSCODE.ERROR, data: err });
  }
  
  
  
};

export { TRANSCODE, DEFAULTS, doTranscode };