import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #222;
  text-align: center;
  
`;

const PreviewPlayer = styled.video`
    max-width: 600px;
`


const VideoPreview = ({ videoSrc, onLoad }) => {

    const handleLoad = (e) => {
        const { target } = e;
        console.log(target);
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