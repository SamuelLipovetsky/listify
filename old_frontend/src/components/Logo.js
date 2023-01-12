import * as React from "react";
import "./logo.css";
function SvgComponent(props) {
  console.log(props);
  return (
    <svg
      id="logo"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      imageRendering="optimizeQuality"
      fillRule="evenodd"
      clipRule="evenodd"
    >
      <circle
        cx={250}
        cy={250}
        r={245}
        stroke={props.props.cStroke}
        fill={props.props.cFill}
        strokeWidth={1.687}
        strokeMiterlimit={10}
      />
      <text
        x="53%"
        y="60%"
        textAnchor="middle"
        fill={props.props.tFill}
        stroke={props.props.tStroke}
        fontSize={370}
        strokeWidth={3}
        alignmentBaseline="middle"
        fontFamily="'Dancing Script',cursive"
        dominant-baseline="middle"
      >
        {"L"}
      </text>
    </svg>
  );
}

export default SvgComponent;
