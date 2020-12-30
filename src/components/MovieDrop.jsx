import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components';

const getColor = (props) => {
    if (props.isDragAccept) {
        return 'rgba(200,200,200, .9)';
    }
    if (props.isDragReject) {
        return '#ff1744';
    }
    if (props.isDragActive) {
        return '#2196f3';
    }
    return 'rgba(200,200,200, .5)';
}

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 18px;  
  padding: 120px 0;
  border-width: 1px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  background-color: rgba(0, 0, 0, 0.3);
  border-style: solid;
  color: ${(props) => props.theme.colors.text};
  box-shadow: ${(props) =>
    props.isDragAccept
      ? 'inset 0px 0px 12px rgba(0,0,0,.7)'
      : 'inset 0px 0px 4px rgba(0,0,0,.3)'};
  outline: none;

  transition: box-shadow 0.5s linear, border-color 0.3s linear;
`;


const MovieDrop = ({ onFileDrop, fileTypes, maxSize }) => {
    const onDrop = useCallback(acceptedFiles => {

        if (acceptedFiles.length) {
            onFileDrop(acceptedFiles.pop());
        }
    }, [])

    const {
        fileRejections,
        isDragActive,
        isDragAccept,
        isDragReject,
        getRootProps,
        getInputProps
    } = useDropzone({
        accept: fileTypes,
        multiple: false,
        maxSize,
        onDrop,
    });
    if (fileRejections.length) {
        // TODO : let the user know why it failed
        console.log(fileRejections.filter(({ errors }) => console.log(errors)));
    }
    
    
    return (
      <Container {...getRootProps()} {...{isDragAccept, isDragActive, isDragReject}} >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Let go we gotcha...</p>
        ) : (
          <p>Drag 'n' drop a video file here, or click to select a video file.</p>
        )}
      </Container>
    );
}

export default MovieDrop