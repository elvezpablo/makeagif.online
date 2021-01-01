import React from 'react';
import styled from 'styled-components';
import Linked from './icons/Linked';
import UnLinked from './icons/Unlinked';
import Input from "./Input";
import Label from './Label';

const Link = styled.div`
  display: inline-block;
  margin: 0 6px;
`;

const Dimensions = ({ readOnlu, data, onChange }) => {
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
      <Label>{`w: `}</Label>
      <Input
        readOnly={readOnlu}
        // value={data.width}
        onChange={inputChange('width')}
      />
      <Link>{data.ratioLocked ? <Linked /> : <UnLinked />}</Link>
      <Label>{`h: `}</Label>
      <Input
        readOnly={readOnlu}
        // value={data.height}
        onChange={inputChange('height')}
      />
    </>
  );
};

export default Dimensions;