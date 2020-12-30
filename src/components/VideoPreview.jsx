import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  border-width: 1px;
  border-radius: 2px;
  border-color: rgba(200, 200, 200, 0.5);
  border-style: solid;
  padding: 2px;
  
`;

const PreviewPlayer = styled.video`
    width: 596px;
`


const VideoPreview = ({ videoSrc, onLoad }) => {

    const handleLoad = (e) => {
        const { target } = e;        
        const { videoWidth: width, videoHeight: height, duration } = target;
        if (onLoad) {
            onLoad(width, height, duration);
        }
    }

    const key = `${videoSrc.size}-${videoSrc.lastModified}`;
    const src = URL.createObjectURL(videoSrc);
    return (<Container key={key}><PreviewPlayer onLoadedMetadata={handleLoad} ><source src={src} /></PreviewPlayer></Container>);
}

export default VideoPreview;