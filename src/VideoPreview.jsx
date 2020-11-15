import React from 'react';

const VideoPreview = ({ videoSrc }) => {
    const key = `${videoSrc.size}-${videoSrc.lastModified}`;
    const src = URL.createObjectURL(videoSrc);
    return (<video key={key} ><source src={src} /></video>);
}

export default VideoPreview;