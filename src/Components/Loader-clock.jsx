import React from 'react';
import styled from 'styled-components';

const Loader = () => {
    return (
        <StyledWrapper>
            <div className="loader">
                <span className="hour" />
                <span className="min" />
                <span className="circel" />
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .loader {
   width: 2.4375rem;   /* 65px → 39px (60% de 65px) */
   height: 2.4375rem;  /* 65px → 39px */
   border: 0.3rem solid #4a90e2;  /* 8px → 4.8px (60% de 8px) */
   border-radius: 1.875rem;  /* 50px → 30px */
   position: relative;
  }

  .loader span {
   display: block;
   background: #4a90e2;
  }

  .loader .hour,
  .loader .min {
   width: 0.225rem;   /* 6px → 3.6px */
   height: 0.825rem;  /* 22px → 13.2px */
   border-radius: 1.875rem;  /* 50px → 30px */
   position: absolute;
   top: 0.91875rem;   /* 24.5px → 14.7px */
   left: 0.7875rem;   /* 21px → 12.6px */
   animation: load9243 1.2s linear infinite;
   transform-origin: top center;
  }

  .loader .min {
   height: 0.6375rem;  /* 17px → 10.2px */
   animation: load9243 4s linear infinite;
  }

  .loader .circel {
   width: 0.375rem;   /* 10px → 6px */
   height: 0.375rem;  /* 10px → 6px */
   border-radius: 1.875rem;  /* 50px → 30px */
   position: absolute;
   top: 0.7125rem;  /* 19px → 11.4px */
   left: 0.7125rem;  /* 19px → 11.4px */
  }

  @keyframes load9243 {
   0% {
    transform: rotate(0deg);
   }

   100% {
    transform: rotate(360deg);
   }
  }`;

export default Loader;
