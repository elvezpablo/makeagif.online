import React from 'react';
import styled from "styled-components";
import Dimensions from './Dimensions';
import Label from "./Label";
import { formatBytes, formatTime } from '../formatters';

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 2px 0 0 2px;
  border-top: 1px solid rgba(120, 120, 120, 0.3);
  border-bottom: 1px solid rgba(120, 120, 120, 0.4);
  border-left: 1px solid rgba(120, 120, 120, 0.3);
  margin: 0 0 8px 0;
  padding: 8px 8px 8px 8px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.25);
  position: absolute;
  left: -217px;
  bottom:  18px;
  width: 200px;
  height: 200px;
`;

const Settings = ({ settings, onChange }) => {
    
    const { 
      duration, 
      height, 
      ratioLocked, 
      size, 
      type,
      width, 
    } = settings;
    return (
      <Container>
        <Dimensions
          readOnly={true}
          data={{ width, height, ratioLocked }}
          onChange={(d) => console.log(d)}
        />
        <Label>{`size: ${formatBytes(size)}`}</Label>
        <Label>{`duration: ${formatTime(duration)}`}</Label>
        <Label>{`file type: ${type}`}</Label>
      </Container>
    );
}

export default Settings;