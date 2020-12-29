import React from 'react';
import styled from 'styled-components';
import ReactSlider from 'react-slider';

const StyledSlider = styled(ReactSlider)`
  width: 100%;
  height: 25px;
`;

const StyledTrack = styled.div`
  top: 0;
  bottom: 0;
  background: ${(props) =>
    props.index === 2 ? '#f00' : props.index === 1 ? '#0f0' : '#ddd'};
  border-radius: 900px;
`;

const Track = (props, state) => <StyledTrack {...props} index={state.index} />;

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

const ClippingSlider = () => {
    return (
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
    );
}

export default ClippingSlider;