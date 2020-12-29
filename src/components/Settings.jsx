import React from 'react';
import styled from "styled-components";

import Linked from "../components/icons/Linked.jsx";
import UnLinked from "../components/icons/Unlinked.jsx";
import {formatBytes, formatTime, estimateGifSize} from "../formatters";

const Input = styled.input`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  background: transparent;
`;

const Metadata = styled.div`
  color: ${({theme}) => theme.colors.text};
`

const Dimensions = ({ data, onChange }) => {

    const inputChange = (attr) => {
        const obj = {};
        return e => {
            obj[attr] = parseInt(e.target.value);
            const out = { ...data, ...obj };
            console.log(out);
            onChange(out)
        }
    }
   
    return (
      <>
        <Input value={data.width} onChange={inputChange('width')} />
        {data.ratioLocked ? <Linked /> : <UnLinked />}
        <Input value={data.height} onChange={inputChange('height')} />

        <Metadata>{`Size: ${formatBytes(data.size)} Duration: ${formatTime(
          data.duration,
        )}`}</Metadata>
      </>
    );
}

const Settings = ({ settings, onChange }) => {
    console.log(settings);
    const [value, setValue] = React.useState([0, 100]);
    const { ratioLocked, width, height, size, duration } = settings;
    return (
      <div>
        <Dimensions
          data={{ width, height, ratioLocked, size, duration }}
          onChange={(d) => console.log(d)}
        />
        
      </div>
    );
}

export default Settings;