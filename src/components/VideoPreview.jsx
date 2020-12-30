import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  border-width: 1px;
  border-radius: 2px;
  border-color: rgba(200, 200, 200, 0.5);
  box-shadow: 0px 0px 12px rgba(0,0,0,.6);
  border-style: solid;
  padding: 2px;
  text-align: center;
`;

const PreviewPlayer = styled.video`    
    max-width: 596px;
`
const getVideoUrl = videoSrc => {
    // TODO: this is for ease of development so I don't have to load videos all the time
    if(videoSrc === "string") {
        
        return [];
    } 
    const key = `${videoSrc.size}-${videoSrc.lastModified}`;
    const src = URL.createObjectURL(videoSrc);
    return [key, src];
}

const VideoPreview = ({ videoSrc, onLoad }) => {

    const handleLoad = (e) => {
        const { target } = e;        
        const { videoWidth: width, videoHeight: height, duration } = target;
        if (onLoad) {
            onLoad(width, height, duration);
        }
    }
    if(typeof videoSrc === "string") {

    }
    const [key, src] = getVideoUrl(videoSrc);
    return (<Container key={key}><PreviewPlayer onLoadedMetadata={handleLoad} ><source src={src} /></PreviewPlayer></Container>);
}

export default VideoPreview;