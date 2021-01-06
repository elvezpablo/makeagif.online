import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components';

const getColor = (props) => {
    if (props.isDragAccept) {
        return props.theme.colors.borderActive;
    }
    if (props.isDragReject) {
        return props.theme.colors.error;
    }
    if (props.isDragActive) {
        return props.theme.colors.primary;
    }
    return props.theme.colors.border;
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
      : 'inset 0px 0px 4px rgba(0,0,0,.3), 0px 0px 10px rgba(0,0,0,.6)'};
  outline: none;

  transition: box-shadow 0.5s linear, border-color 0.3s linear;
`;

const Message = styled.div`
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes[3]};
`;

const MovieDrop = ({ onFileDrop, fileTypes, maxSize }) => {
    const onDrop = useCallback(acceptedFiles => {

        if (acceptedFiles.length) {
            onFileDrop(acceptedFiles.pop());
        }
    }, [])

    const {
        fileRejections,
        getInputProps,
        getRootProps,
        isDragAccept,
        isDragActive,
        isDragReject
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
      <Container
        {...getRootProps()}
        {...{ isDragAccept, isDragActive, isDragReject }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <Message>Let go we gotcha...</Message>
        ) : (
          <>
            <Message>
              Drag 'n' drop a video file here, or click to select a video file.
            </Message>
            
          </>
        )}
      </Container>
    );
}

export default MovieDrop