import React from 'react';
import styled from 'styled-components';
import Linked from './icons/Linked';
import UnLinked from './icons/Unlinked';
import Input from "./Input";

import { formatBytes, formatTime } from '../formatters';
import ClippingSlider from './ClippingSlider';


const Metadata = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes[1]};
  color: ${({ theme }) => theme.colors.text};
`;

const Dimensions = ({ data, onChange }) => {
  const inputChange = (attr) => {
    const obj = {};
    return (e) => {
      obj[attr] = parseInt(e.target.value);
      const out = { ...data, ...obj };
      onChange(out);
    };
  };

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
};

export default Dimensions;