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
    viewBox="0 0 14 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M6.81763 4.23535C6.05974 4.23535 5.44531 4.86062 5.44531 5.63196C5.44531 6.40327 6.05971 7.02858 6.81763 7.02858C7.57553 7.02858 8.18996 6.40331 8.18996 5.63196C8.18996 4.86062 7.57556 4.23535 6.81763 4.23535ZM6.81763 6.3635C6.42063 6.3635 6.0988 6.03597 6.0988 5.63193C6.0988 5.2279 6.42063 4.90037 6.81763 4.90037C7.21464 4.90037 7.53647 5.2279 7.53647 5.63193C7.53647 6.03597 7.21464 6.3635 6.81763 6.3635Z"
      fill="#606770"
    />
    <Path
      d="M12.2898 1.04322L3.3698 0.0124199C3.02361 -0.0376704 2.67285 0.0651834 2.40593 0.295077C2.13904 0.505685 1.96796 0.817875 1.93216 1.15963L1.7688 2.52298H1.26232C0.543477 2.52298 0.00434775 3.17139 0.00434775 3.90295V10.703C-0.0137577 11.4006 0.527248 11.9811 1.21275 11.9996C1.22926 12 1.24581 12.0001 1.26232 11.9999H10.2314C10.9502 11.9999 11.6037 11.4346 11.6037 10.703V10.437C11.8265 10.3932 12.038 10.3026 12.2245 10.171C12.4892 9.94421 12.6587 9.62301 12.6983 9.27321L13.4498 2.52298C13.5264 1.78973 13.0093 1.13013 12.2898 1.04322ZM10.9502 10.703C10.9502 11.0688 10.5908 11.3348 10.2314 11.3348H1.26232C0.937638 11.3445 0.666713 11.0845 0.657176 10.7541C0.656675 10.7371 0.656894 10.7201 0.657832 10.703V9.47271L3.19009 7.57733C3.49429 7.33964 3.92275 7.36077 4.203 7.6272L5.98374 9.22331C6.25416 9.45438 6.59457 9.58355 6.94764 9.58909C7.2237 9.59253 7.49522 9.51771 7.73184 9.37294L10.9502 7.47756V10.703H10.9502ZM10.9502 6.69613L7.38871 8.80766C7.08289 8.99205 6.69579 8.95866 6.42481 8.72454L4.62774 7.11178C4.11269 6.66138 3.35989 6.63376 2.81432 7.04527L0.657832 8.64138V3.90295C0.657832 3.53717 0.902897 3.18803 1.26232 3.18803H10.2314C10.6154 3.20423 10.9255 3.51266 10.9502 3.90295V6.69613ZM12.7969 2.43321C12.7967 2.4354 12.7965 2.43763 12.7963 2.43983L12.0284 9.19005C12.0297 9.36508 11.9513 9.53085 11.816 9.63896C11.7507 9.70547 11.6037 9.73872 11.6037 9.77198V3.90295C11.5779 3.14551 10.9758 2.54013 10.2313 2.52298H2.42225L2.56929 1.22614C2.60118 1.05821 2.68746 0.906026 2.81435 0.793848C2.95763 0.693031 3.13087 0.646027 3.30448 0.660825L12.2082 1.70827C12.5674 1.74299 12.831 2.06755 12.7969 2.43321Z"
      fill="#606770"
    />
  </Svg>
);
export default SVGComponent;