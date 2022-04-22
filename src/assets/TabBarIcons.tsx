import { useColorModeValue } from "native-base";
import Svg, { Path } from "react-native-svg";
type IconProps = {
  focused: boolean;
  color: string;
};

export const HomeIcon = ({ focused, color }: IconProps) => {
  if (focused) {
    return (
      <Svg viewBox="0 0 24 24" width="28" height="28">
        <Path
          fill={color}
          d="M12.713 2.296a1 1 0 0 0-1.42 0l-8.997 8.997a1 1 0 0 0 .71 1.71h1V20A2 2 0 0 0 6.004 22H18a2 2 0 0 0 2-2v-6.997h1a1 1 0 0 0 .925-1.384 1.001 1.001 0 0 0-.216-.326l-8.997-8.997Z"
        />
      </Svg>
    );
  }
  return (
    <Svg viewBox="0 0 24 24" width="28" height="28" fill={color}>
      <Path d="M12.713 2.296a1 1 0 0 0-1.42 0l-8.997 8.997a1 1 0 0 0 .71 1.71h1V20A2 2 0 0 0 6.004 22H18a2 2 0 0 0 2-2v-6.997h1a1 1 0 0 0 .925-1.384 1.001 1.001 0 0 0-.216-.326l-8.997-8.997ZM6.005 20v-9.588l5.998-5.998L18 10.413v9.588H6.005Z" />
    </Svg>
  );
};

export const CalendarIcon = ({ focused, color }: IconProps) => {
  if (focused) {
    return (
      <Svg width="28" height="28" stroke={color} viewBox="0 0 24 24">
        <Path
          d="M18.4 4.8H5.8A1.8 1.8 0 0 0 4 6.6v3.6h16.2V6.6a1.8 1.8 0 0 0-1.8-1.8ZM15.7 3v3.6M8.5 3v3.6"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M18.4 21a1.8 1.8 0 0 0 1.8-1.8v-9H4v9A1.8 1.8 0 0 0 5.8 21h12.6Z"
          fill={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }
  return (
    <Svg stroke={color} width="28" height="28" viewBox="0 0 24 24">
      <Path
        d="M18.4 4.8H5.8A1.8 1.8 0 0 0 4 6.6v12.6A1.8 1.8 0 0 0 5.8 21h12.6a1.8 1.8 0 0 0 1.8-1.8V6.6a1.8 1.8 0 0 0-1.8-1.8ZM15.7 3v3.6M8.5 3v3.6M4 10.2h16.2"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
export const ListIcon = ({ focused, color }: IconProps) => {
  if (focused) {
    return (
      <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <Path
          d="M9.778 2H3.11A1.111 1.111 0 0 0 2 3.111v6.667a1.111 1.111 0 0 0 1.111 1.11h6.667a1.111 1.111 0 0 0 1.11-1.11V3.11A1.111 1.111 0 0 0 9.779 2Zm4.444 8.889h6.667A1.111 1.111 0 0 0 22 9.778V3.11A1.111 1.111 0 0 0 20.889 2h-6.667a1.111 1.111 0 0 0-1.11 1.111v6.667a1.111 1.111 0 0 0 1.11 1.11ZM2 20.889A1.111 1.111 0 0 0 3.111 22h6.667a1.111 1.111 0 0 0 1.11-1.111v-6.667a1.111 1.111 0 0 0-1.11-1.11H3.11A1.111 1.111 0 0 0 2 14.221v6.667Zm11.111 0A1.111 1.111 0 0 0 14.222 22h6.667A1.111 1.111 0 0 0 22 20.889v-6.667a1.111 1.111 0 0 0-1.111-1.11h-6.667a1.111 1.111 0 0 0-1.11 1.11v6.667Z"
          fill={color}
        />
      </Svg>
    );
  }
  return (
    <Svg width="28" height="28" viewBox="0 0 24 24">
      <Path
        d="M9.778 2H3.11A1.111 1.111 0 0 0 2 3.111v6.667a1.111 1.111 0 0 0 1.111 1.11h6.667a1.111 1.111 0 0 0 1.11-1.11V3.11A1.111 1.111 0 0 0 9.779 2ZM8.667 8.667H4.222V4.222h4.445v4.445Zm5.555 2.222h6.667A1.111 1.111 0 0 0 22 9.778V3.11A1.111 1.111 0 0 0 20.889 2h-6.667a1.111 1.111 0 0 0-1.11 1.111v6.667a1.111 1.111 0 0 0 1.11 1.11Zm1.111-6.667h4.445v4.445h-4.445V4.222ZM2 20.89A1.111 1.111 0 0 0 3.111 22h6.667a1.111 1.111 0 0 0 1.11-1.111v-6.667a1.111 1.111 0 0 0-1.11-1.11H3.11A1.111 1.111 0 0 0 2 14.221v6.667Zm2.222-5.556h4.445v4.445H4.222v-4.445Zm8.89 5.556A1.111 1.111 0 0 0 14.221 22h6.667A1.111 1.111 0 0 0 22 20.889v-6.667a1.111 1.111 0 0 0-1.111-1.11h-6.667a1.111 1.111 0 0 0-1.11 1.11v6.667Zm2.221-5.556h4.445v4.445h-4.445v-4.445Z"
        fill={color}
      />
    </Svg>
  );
};

export const ProfileIcon = ({ focused, color }: IconProps) => {
  if (focused) {
    return (
      <Svg width="28" height="28" viewBox="0 0 24 24">
        <Path
          d="M20.79 23h1.105v-1.105c0-4.265-3.472-7.737-7.737-7.737H9.737C5.47 14.158 2 17.63 2 21.895V23h18.79ZM8.877 2.931a5.526 5.526 0 1 1 6.14 9.19 5.526 5.526 0 0 1-6.14-9.19Z"
          fill={color}
        />
      </Svg>
    );
  }
  return (
    <Svg width="28" height="28" viewBox="0 0 24 24">
      <Path
        d="M11.947 2a5.526 5.526 0 1 0 0 11.053 5.526 5.526 0 0 0 0-11.053Zm0 8.842a3.316 3.316 0 1 1 0-6.633 3.316 3.316 0 0 1 0 6.633ZM21.895 23v-1.105a7.737 7.737 0 0 0-7.737-7.737H9.737A7.737 7.737 0 0 0 2 21.895V23h2.21v-1.105a5.526 5.526 0 0 1 5.527-5.527h4.42a5.527 5.527 0 0 1 5.527 5.527V23h2.21Z"
        fill={color}
      />
    </Svg>
  );
};
