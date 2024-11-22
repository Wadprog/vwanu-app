import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface Props {
  width?: number;
  height?: number;
}
const SVGComponent: React.FC<Props> = (props) => (
  <Svg
    width={props.width || 24}
    height={props.height || 24}
    viewBox="0 0 5 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.59183 3C3.51675 3 4.27351 2.325 4.27351 1.5C4.27351 0.675 3.51675 0 2.59183 0C1.66691 0 0.910156 0.675 0.910156 1.5C0.910156 2.325 1.66691 3 2.59183 3ZM2.59183 4.5C1.66691 4.5 0.910156 5.175 0.910156 6C0.910156 6.825 1.66691 7.5 2.59183 7.5C3.51675 7.5 4.27351 6.825 4.27351 6C4.27351 5.175 3.51675 4.5 2.59183 4.5ZM2.59183 9C1.66691 9 0.910156 9.675 0.910156 10.5C0.910156 11.325 1.66691 12 2.59183 12C3.51675 12 4.27351 11.325 4.27351 10.5C4.27351 9.675 3.51675 9 2.59183 9Z"
      fill="#606770"
      fillOpacity={0.87}
    />
  </Svg>
);
export default SVGComponent;
