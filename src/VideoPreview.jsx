import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    background-color: #222;
    text-align: center;
`

const VideoPreview = ({ videoSrc }) => {
    const key = `${videoSrc.size}-${videoSrc.lastModified}`;
    const src = URL.createObjectURL(videoSrc);
    return (<Container key={key}><video ><source src={src} /></video></Container>);
}

export default VideoPreview;