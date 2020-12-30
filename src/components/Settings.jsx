import React from 'react';
import styled from "styled-components";
import Dimensions from './Dimensions';
import Label from "./Label";
import { formatBytes, formatTime } from '../formatters';

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  border: 1px solid rgba(22,22,22,.2);
  margin: 0 0 8px 0;
  padding: 8px 8px 8px 8px;
`;

const Settings = ({ settings, onChange }) => {
    console.log(settings);    
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
          data={{ width, height, ratioLocked }}
          onChange={(d) => console.log(d)}
        />
        <Label>{`size: ${formatBytes(size)} duration: ${formatTime(
          duration,
        )} file type: ${type}`}</Label>
      </Container>
    );
}

export default Settings;