import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

// Max size in chrome with this library 
// https://github.com/ffmpegwasm/ffmpeg.wasm/issues/92
const MAX_FILE_SIZE = Math.pow(10, 6) * 261;

const MovieDrop = ({ onFileDrop }) => {
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        // console.log(acceptedFiles);
        if (acceptedFiles.length) {
            onFileDrop(acceptedFiles.pop());
        }
    }, [])

    const {
        acceptedFiles,
        fileRejections,
        isDragActive,
        getRootProps,
        getInputProps
    } = useDropzone({
        accept: 'video/mp4, video/mov',
        multiple: false,
        maxSize: MAX_FILE_SIZE,
        onDrop,
    });

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag 'n' drop some files here, or click to select files</p>
            }
        </div>
    )
}

export default MovieDrop;