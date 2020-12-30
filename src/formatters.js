import { DEFAULTS } from './makeagif/transcode.js';

function formatBytes(bytes) {
  var marker = 1024; // Change to 1000 if required
  var decimal = 0; // Change as required
  var kiloBytes = marker; // One Kilobyte is 1024 bytes
  var megaBytes = marker * marker; // One MB is 1024 KB
  var gigaBytes = marker * marker * marker; // One GB is 1024 MB

  // return bytes if less than a KB
  if (bytes < kiloBytes) return bytes + 'Bytes';
  // return KB if less than a MB
  else if (bytes < megaBytes)
    return (bytes / kiloBytes).toFixed(decimal) + 'KB';
  // return MB if less than a GB
  else if (bytes < gigaBytes)
    return (bytes / megaBytes).toFixed(decimal) + 'MB';
  // return GB if less than a TB
  else return (bytes / gigaBytes).toFixed(decimal) + 'GB';
}

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.round(seconds % 60);
  return [h, m > 9 ? m : h ? '0' + m : m || '0', s > 9 ? s : '0' + s]
    .filter(Boolean)
    .join(':');
}

// https://stackoverflow.com/questions/29487996/how-to-calculate-size-of-a-gif-image
function estimateGifSize(width, height, length) {
  // (x * y * fps * length) / 8
  return (width * height * DEFAULTS.fps * length) / 2;
}

export { formatBytes, formatTime, estimateGifSize };