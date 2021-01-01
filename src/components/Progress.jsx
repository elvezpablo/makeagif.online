import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Component = styled.div`
  width: ${({ value }) => value * 100}%;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  transition: width 0.5s ease-in-out;
`;

const Background = styled.div`
  width: 100%;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.grey};
`;

const LOADING = 0.33;

const Progress = ({value}) => {
  const [percent, setPercent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      
      setPercent((percent) => {
         if (percent + 0.05 < LOADING) {
           return percent + 0.05;           
         }
         clearInterval(interval);
         return LOADING;
        
      });  
      
    }, 800);
    
    return () => clearInterval(interval);
  }, []); 

  
  const remaining = 1 - LOADING;
  const normalized = Math.max(value,0) * remaining;
 
  return <Component value={normalized + percent} />;
}

export default Progress