import React from "react";
import styled from "styled-components";

const SVGWrapper = styled.div`
  width: ${props => (props.width ? props.width : "100%")};
  height: ${props => (props.height ? props.height : "auto")};
`;

export const ItinerarySVG = props => {
  return (
    <SVGWrapper width={props.width} height={props.height}>
      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <linearGradient
          id="a"
          gradientUnits="userSpaceOnUse"
          x1="37.029"
          x2="443.54"
          y1="446.963"
          y2="40.452"
        >
          <stop offset="0" stopColor="#41dfd0" />
          <stop offset="1" stopColor="#ee83ef" />
        </linearGradient>
        <path
          d="M95.992 496h192a24.026 24.026 0 0 0 24-24V250.253l83-18.444a8 8 0 0 0 6.262-7.809v-37.316l5.027-5.028a177.316 177.316 0 0 0 48.012-88.011c3.219-14.821 1.891-29.032-3.836-41.086a64.024 64.024 0 0 0-115.668 0c-5.727 12.054-7.055 26.265-3.84 41.086a177.312 177.312 0 0 0 48.02 88.011l6.285 6.285v29.641l-73.262 16.281V112a24.026 24.026 0 0 0-24-24h-192a24.027 24.027 0 0 0-24 24v360a24.027 24.027 0 0 0 24 24zM346.586 90.254c-1.715-7.906-2.645-19.672 2.656-30.828a48.022 48.022 0 0 1 86.762 0c5.3 11.156 4.371 22.922 2.652 30.828a161.354 161.354 0 0 1-43.687 80.09l-2.344 2.344-2.344-2.344a161.4 161.4 0 0 1-43.695-80.09zM287.992 480h-192a8.011 8.011 0 0 1-8-8v-40h208v40a8.011 8.011 0 0 1-8 8zM185.254 296v-17.582l110.738-24.609V416h-208V168h208v69.419L175.52 264.191a8 8 0 0 0-6.266 7.809v24zM95.992 104h192a8.011 8.011 0 0 1 8 8v40h-208v-40a8.011 8.011 0 0 1 8-8zm39.985 220.117L131.007 344h-1.753a16.016 16.016 0 0 0-16 16v24a8 8 0 0 0 8 8h18.219a15.87 15.87 0 0 0 27.562 0h20.438a15.87 15.87 0 0 0 27.562 0h18.219a8 8 0 0 0 8-8v-24a16.016 16.016 0 0 0-16-16H222.2l-11.578-23.156A15.915 15.915 0 0 0 196.309 312H151.5a15.975 15.975 0 0 0-15.523 12.117zM151.5 328h17.754v16H147.5zm73.754 48h-10.219a15.87 15.87 0 0 0-27.562 0h-20.438a15.87 15.87 0 0 0-27.562 0h-10.219v-16h96zm-20.945-32h-19.055v-16h11.055zm166.57-75.188l-40 8.3-3.25-15.664 40-8.3zM242.25 298.684L239 283.02l40-8.3 3.25 15.664zM167.992 448h48v16h-48zm48-312h-48v-16h48zm-78.738 64h-16v-16h16zm32 0h-16v-16h16zM424.625 80a32 32 0 1 0-32 32 32.036 32.036 0 0 0 32-32zm-48 0a16 16 0 1 1 16 16 16.016 16.016 0 0 1-16-16zm-145.264 48a8 8 0 1 1 8 8 8 8 0 0 1-8-8zM55.992 408h-16v-16h16zm0-32h-16v-16h16zm0-32h-16v-32h16z"
          fill="url(#a)"
        />
      </svg>
    </SVGWrapper>
  );
};

export const BudgetSVG = props => {
  return (
    <SVGWrapper width={props.width} height={props.height}>
      <svg viewBox="0 0 496 496" xmlns="http://www.w3.org/2000/svg">
        <linearGradient
          id="a"
          gradientUnits="userSpaceOnUse"
          x1="248"
          x2="248"
          y1="496"
        >
          <stop offset="0" stopColor="#9f2fff" />
          <stop offset="1" stopColor="#0bb1d3" />
        </linearGradient>
        <path
          d="M472 160h-8V64H80V0H40C17.945 0 0 17.945 0 40v304c0 22.055 17.945 40 40 40h216v88c0 13.23 10.77 24 24 24h192c13.23 0 24-10.77 24-24V184c0-13.23-10.77-24-24-24zM16 40c0-13.23 10.77-24 24-24h24v288H40c-9 0-17.313 2.992-24 8.016zm24 328c-13.23 0-24-10.77-24-24s10.77-24 24-24h40V80h368v80H282.48c-13.433-37.977-49.726-64-90.48-64-52.938 0-96 43.063-96 96s43.062 96 96 96c23.84 0 46.559-8.953 64-24.55V368zm216-184h-56v-71.55c30.152 3.046 56.281 23.07 66.93 51.472C260.36 168.207 256 175.594 256 184zm-72 87.594c-40.367-4.028-72-38.188-72-79.594s31.633-75.566 72-79.594zM200 200h56v39.824c-13.473 17.992-33.824 29.45-56 31.688zm280 272c0 4.406-3.594 8-8 8H280c-4.406 0-8-3.594-8-8V184c0-4.406 3.594-8 8-8h192c4.406 0 8 3.594 8 8zM288 272h176v-80H288zm16-64h144v48H304zm112 256h48v-48h-48zm16-32h16v16h-16zm-80 32h48v-48h-48zm16-32h16v16h-16zm-80 32h48v-48h-48zm16-32h16v16h-16zm112-32h48v-48h-48zm16-32h16v16h-16zm-80 32h48v-48h-48zm16-32h16v16h-16zm-80 32h48v-48h-48zm16-32h16v16h-16zm112-32h48v-48h-48zm16-32h16v16h-16zm-80 32h48v-48h-48zm16-32h16v16h-16zm-80 32h48v-48h-48zm16-32h16v16h-16zm128-192H320V96h112zm0 32H304v-16h128zm0 0"
          fill="url(#a)"
        />
      </svg>
    </SVGWrapper>
  );
};

export const ToDoListSVG = props => {
  return (
    <SVGWrapper width={props.width} height={props.height}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        data-name="Layer 1"
        viewBox="0 0 512 512"
      >
        <defs>
          <linearGradient
            id="TDa"
            x1="256"
            y1="10.145"
            x2="256"
            y2="498.84"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#00efd1" />
            <stop offset="1" stopColor="#00acea" />
          </linearGradient>
          <linearGradient
            id="TDb"
            x1="216.561"
            y1="10.145"
            x2="216.561"
            y2="498.84"
            xlinkHref="#TDa"
          />
          <linearGradient
            id="TDc"
            x1="265.251"
            y1="10.145"
            x2="265.251"
            y2="498.84"
            xlinkHref="#TDa"
          />
          <linearGradient
            id="TDd"
            x1="228"
            y1="10.145"
            x2="228"
            y2="498.84"
            xlinkHref="#TDa"
          />
          <linearGradient
            id="TDe"
            x1="193.991"
            y1="10.145"
            x2="193.991"
            y2="498.84"
            xlinkHref="#TDa"
          />
          <linearGradient
            id="TDf"
            x1="262.009"
            y1="10.145"
            x2="262.009"
            y2="498.84"
            xlinkHref="#TDa"
          />
        </defs>
        <path
          d="M453.775 106.469l-92.221-93.951a8.038 8.038 0 0 0-1.881-1.917l-.248-.229A7.979 7.979 0 0 0 353.716 8H138.734C115.961 8 97.17 23.834 93.477 44.59 71.594 48 55 66.145 55 87.989v372.053C55 484.307 75.344 504 100.755 504h272.511c22.773 0 41.564-15.834 45.257-36.59C440.406 464 457 445.855 457 424.011v-310.65a7.851 7.851 0 0 0-1.939-5.408 7.261 7.261 0 0 0-1.286-1.484zM363 36.815L429.673 105h-55.646C367.938 105 363 100.269 363 94.753zM373.266 488H100.755C84.166 488 71 475.484 71 460.042V87.989c0-12.827 9-23.661 22-26.964v362.986C93 448.275 113.322 468 138.734 468H402.1c-3.7 12-15.22 20-28.834 20zM441 424.011C441 439.453 427.834 452 411.245 452H138.734C122.145 452 109 439.453 109 424.011V53.229c0-.407-.069-.821-.069-1.245a7.738 7.738 0 0 0-.166-1.036C109.352 35.983 122.517 24 138.734 24H347v70.753C347 109.091 359.116 121 374.027 121H441z"
          fill="url(#TDa)"
        />
        <path
          d="M150.795 292h131.531a8 8 0 0 0 0-16H150.795a8 8 0 1 0 0 16z"
          fill="url(#TDb)"
        />
        <path
          d="M142.795 323a8 8 0 0 0 8 8h228.913a8 8 0 1 0 0-16H150.795a8 8 0 0 0-8 8zM379.708 354H150.795a8 8 0 1 0 0 16h228.913a8 8 0 1 0 0-16zM379.708 393H150.795a8 8 0 1 0 0 16h228.913a8 8 0 1 0 0-16z"
          fill="url(#TDc)"
        />
        <path
          d="M165.908 219h2.469l-16.286 23.617a8.04 8.04 0 0 0 6.572 12.605 7.876 7.876 0 0 0 6.586-3.331l6.232-8.891h113.038l6.232 8.9a8 8 0 0 0 11.13 1.947 8.1 8.1 0 0 0 2.028-11.216L287.623 219h2.469A22.827 22.827 0 0 0 313 196.137V89.6a23.1 23.1 0 0 0-14.715-21.479L236.22 44.288a22.941 22.941 0 0 0-16.475-.059L157.66 68h.051C148.881 72 143 80.138 143 89.6v106.537A22.827 22.827 0 0 0 165.908 219zm107.543 8h-90.9l5.282-8h80.338zm16.641-24H165.908a6.81 6.81 0 0 1-6.908-6.863V140h138v56.137a6.81 6.81 0 0 1-6.908 6.863zM297 100v24H159v-24zm-71.511-40.774a6.994 6.994 0 0 1 5.023 0L292.6 82.853c.812.312 1.531 1.147 2.156 1.147H161.242c.626 0 1.345-.835 2.156-1.147z"
          fill="url(#TDd)"
        />
        <path
          d="M193.991 150.4a21.045 21.045 0 1 0 21.045 21.045 21.069 21.069 0 0 0-21.045-21.045zm0 26.09a5.045 5.045 0 1 1 5.045-5.045 5.05 5.05 0 0 1-5.045 5.041z"
          fill="url(#TDe)"
        />
        <path
          d="M262.009 150.4a21.045 21.045 0 1 0 21.045 21.045 21.069 21.069 0 0 0-21.045-21.045zm0 26.09a5.045 5.045 0 1 1 5.045-5.045 5.05 5.05 0 0 1-5.045 5.041z"
          fill="url(#TDf)"
        />
      </svg>
    </SVGWrapper>
  );
};

export const PackingListSVG = props => {
  return (
    <SVGWrapper width={props.width} height={props.height}>
      <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M36.767 42.182H10.815a3.07 3.07 0 0 1-3.061-3.072V17.103a2.905 2.905 0 0 0-2.905-2.905H.586a.586.586 0 1 0 0 1.171h4.263a1.733 1.733 0 0 1 1.733 1.734V39.11a4.243 4.243 0 0 0 4.233 4.244h25.952a.586.586 0 1 0 0-1.172z"
          fill="url(#paint0_linear)"
        />
        <path
          d="M14.097 44.194a2.415 2.415 0 1 0-.011 4.829 2.415 2.415 0 0 0 .011-4.83zm0 3.658a1.244 1.244 0 1 1-.01-2.488 1.244 1.244 0 0 1 .01 2.488z"
          fill="url(#paint1_linear)"
        />
        <path
          d="M32.33 44.194a2.416 2.416 0 1 0-.01 4.831 2.416 2.416 0 0 0 .01-4.831zm0 3.658a1.243 1.243 0 1 1-.01-2.487 1.243 1.243 0 0 1 .01 2.487z"
          fill="url(#paint2_linear)"
        />
        <path
          d="M13.909 39.79v.962a.586.586 0 1 0 1.172 0v-.875h17.792v.875a.586.586 0 1 0 1.172 0v-.939a2.837 2.837 0 0 0 2.236-2.769V24.482a2.836 2.836 0 0 0-2.832-2.832h-5.503v-1.582a1.706 1.706 0 0 0-1.698-1.711h-5.557a1.706 1.706 0 0 0-1.697 1.711v1.581h-4.392a2.836 2.836 0 0 0-2.832 2.833v12.562a2.837 2.837 0 0 0 2.139 2.747zm19.54-1.085H14.6a1.663 1.663 0 0 1-1.66-1.66v-1.347H35.11v1.346a1.663 1.663 0 0 1-1.66 1.66zM20.166 20.068a.533.533 0 0 1 .525-.54h5.557a.534.534 0 0 1 .526.54v1.581h-6.608v-1.58zm-5.564 2.753h9.25l2.606 2.651v2.321c0 .154.06.302.169.412l3.65 3.697a.587.587 0 0 0 .834 0l2.434-2.465a.586.586 0 0 0 0-.824l-3.65-3.697a.587.587 0 0 0-.417-.174h-2.095l-1.887-1.92h7.953a1.662 1.662 0 0 1 1.66 1.66v10.044H12.941V24.482a1.662 1.662 0 0 1 1.66-1.66zm13.028 4.731v-1.638h1.603l3.071 3.111-1.61 1.631-3.064-3.104z"
          fill="url(#paint3_linear)"
        />
        <circle cx="37.5" cy="10.5" r="7.5" fill="url(#paint4_linear)" />
        <circle cx="37.5" cy="10.5" r="6.5" fill="#fff" />
        <path
          d="M35.35 10.367a.585.585 0 1 0-.828.828l1.71 1.71a.585.585 0 0 0 .828 0l3.89-3.89a.586.586 0 1 0-.829-.829l-3.475 3.476-1.296-1.295z"
          fill="url(#paint5_linear)"
        />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="18.677"
            y1="46.078"
            x2="18.677"
            y2="4.681"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".322" stopColor="#A163F5" />
            <stop offset=".466" stopColor="#B074EE" />
            <stop offset=".752" stopColor="#D8A1DD" />
            <stop offset=".898" stopColor="#EFBAD3" />
          </linearGradient>
          <linearGradient
            id="paint1_linear"
            x1="805.279"
            y1="2323.14"
            x2="805.279"
            y2="275.724"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".322" stopColor="#A163F5" />
            <stop offset=".466" stopColor="#B074EE" />
            <stop offset=".752" stopColor="#D8A1DD" />
            <stop offset=".898" stopColor="#EFBAD3" />
          </linearGradient>
          <linearGradient
            id="paint2_linear"
            x1="1725.3"
            y1="2323.13"
            x2="1725.3"
            y2="275.724"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".322" stopColor="#A163F5" />
            <stop offset=".466" stopColor="#B074EE" />
            <stop offset=".752" stopColor="#D8A1DD" />
            <stop offset=".898" stopColor="#EFBAD3" />
          </linearGradient>
          <linearGradient
            id="paint3_linear"
            x1="6531.22"
            y1="10861.8"
            x2="6531.22"
            y2="1120"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".322" stopColor="#A163F5" />
            <stop offset=".466" stopColor="#B074EE" />
            <stop offset=".752" stopColor="#D8A1DD" />
            <stop offset=".898" stopColor="#EFBAD3" />
          </linearGradient>
          <linearGradient
            id="paint4_linear"
            x1="37.5"
            y1="3"
            x2="37.5"
            y2="18"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#EFBAD3" />
            <stop offset="1" stopColor="#EFBAD3" />
            <stop offset="1" stopColor="#C4C4C4" stopOpacity=".01" />
            <stop offset="1" stopColor="#C4C4C4" stopOpacity="0" />
            <stop offset="1" stopColor="#EFBAD3" />
          </linearGradient>
          <linearGradient
            id="paint5_linear"
            x1="2786.17"
            y1="2396.45"
            x2="2786.17"
            y2="250.669"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".322" stopColor="#A163F5" />
            <stop offset=".466" stopColor="#B074EE" />
            <stop offset=".752" stopColor="#D8A1DD" />
            <stop offset=".898" stopColor="#EFBAD3" />
          </linearGradient>
        </defs>
      </svg>
    </SVGWrapper>
  );
};
