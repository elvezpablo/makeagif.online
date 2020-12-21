import React from 'react';
import styled from "styled-components";
import ReactSlider from 'react-slider';

const StyledSlider = styled(ReactSlider)`
  width: 100%;
  height: 25px;
`;

const StyledThumb = styled.div`
  height: 25px;
  line-height: 25px;
  width: 25px;
  text-align: center;
  background-color: #000;
  color: #fff;
  border-radius: 50%;
  cursor: grab;
`;

const Thumb = (props, state) => (
  <StyledThumb {...props}>{state.valueNow}</StyledThumb>
);

const StyledTrack = styled.div`
  top: 0;
  bottom: 0;
  background: ${(props) =>
    props.index === 2 ? '#f00' : props.index === 1 ? '#0f0' : '#ddd'};
  border-radius: 900px;
`;

const Track = (props, state) => <StyledTrack {...props} index={state.index} />;



const Input = styled.input``

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
            <button >{data.ratioLocked ? "locked" : "unlocked"}</button>
            <Input value={data.height} onChange={inputChange('height')} />
        </>
    );
}

const Settings = ({ settings, onChange }) => {
    // console.log(settings);
    const [value, setValue] = React.useState([25, 50]);
    const { ratioLocked, width, height } = settings;
    return (
      <div>
        <Dimensions
          data={{ width, height, ratioLocked }}
          onChange={(d) => console.log(d)}
        />
        <StyledSlider
          value={value}
          onBeforeChange={(val) => console.log('onBeforeChange value:', val)}
          onChange={(val) => {
            console.log('onChange value:', val);
            setValue(val);
          }}
          onAfterChange={(val) => console.log('onAfterChange value:', val)}
          
          renderTrack={Track}
          renderThumb={Thumb}
        />
      </div>
    );
}

export default Settings;