import React from 'react';
import styled from "styled-components";
import Dimensions from './Dimensions';

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  border: 1px solid rgba(22,22,22,.2);
  margin: 0 0 8px 0;
  padding: 8px 8px 8px 8px;
`;

const Settings = ({ settings, onChange }) => {
    console.log(settings);
    const [value, setValue] = React.useState([0, 100]);
    const { ratioLocked, width, height, size, duration } = settings;
    return (
      <Container>
        <Dimensions
          data={{ width, height, ratioLocked, size, duration }}
          onChange={(d) => console.log(d)}
        />        
      </Container>
    );
}

export default Settings;