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

export const SettingsIcon = ({ focused, color }: IconProps) => {
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  ></svg>;

  if (focused) {
    return (
      <Svg width="28" height="28" viewBox="0 0 24 24">
        <Path
          d="M12 14.25C10.7574 14.25 9.75 13.2426 9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25Z"
          fill={color}
        />
        <Path
          d="M1.95045 14.0625L1.97248 14.0447L3.45185 12.8845C3.54554 12.8104 3.6203 12.7151 3.67001 12.6065C3.71972 12.4979 3.74295 12.379 3.73779 12.2597V11.7178C3.74248 11.5992 3.71897 11.4812 3.66918 11.3735C3.61939 11.2658 3.54475 11.1714 3.45138 11.0981L1.97248 9.9375L1.95045 9.91969C1.72236 9.72969 1.56931 9.46475 1.51864 9.17225C1.46797 8.87976 1.523 8.57877 1.67388 8.32312L3.67592 4.85906C3.67822 4.85579 3.68026 4.85235 3.68201 4.84875C3.83371 4.59664 4.06891 4.40562 4.34678 4.30886C4.62464 4.2121 4.92762 4.21571 5.2031 4.31906L5.21951 4.32516L6.95857 5.025C7.06833 5.06938 7.18707 5.08704 7.305 5.07653C7.42293 5.06602 7.53667 5.02763 7.63685 4.96453C7.7906 4.86766 7.94685 4.77609 8.1056 4.68984C8.20853 4.63403 8.2969 4.55481 8.36359 4.45856C8.43027 4.36232 8.4734 4.25176 8.48951 4.13578L8.75154 2.28L8.75716 2.24625C8.81421 1.95881 8.96845 1.69977 9.19398 1.51265C9.41951 1.32554 9.70257 1.22176 9.9956 1.21875H14.0044C14.3015 1.2197 14.5888 1.32549 14.8156 1.51749C15.0424 1.70948 15.1942 1.97536 15.2442 2.26828L15.2484 2.29453L15.5095 4.15406C15.5255 4.2697 15.5683 4.38001 15.6345 4.4762C15.7006 4.57239 15.7883 4.6518 15.8906 4.70813C16.0498 4.79388 16.2061 4.88486 16.3594 4.98094C16.4594 5.04365 16.5728 5.08174 16.6904 5.09209C16.808 5.10244 16.9263 5.08475 17.0358 5.04047L18.7762 4.33734L18.7926 4.33078C19.0685 4.22731 19.3719 4.22384 19.6501 4.32096C19.9283 4.41808 20.1636 4.60965 20.3151 4.86234L20.3212 4.87266L22.3261 8.33906C22.4772 8.59497 22.5323 8.89629 22.4817 9.18913C22.431 9.48197 22.2778 9.74724 22.0495 9.9375L22.0275 9.95531L20.5481 11.1155C20.4544 11.1896 20.3797 11.2849 20.3299 11.3935C20.2802 11.5021 20.257 11.621 20.2622 11.7403V12.2822C20.2575 12.4008 20.281 12.5188 20.3308 12.6265C20.3806 12.7342 20.4552 12.8286 20.5486 12.9019L22.0275 14.0625L22.0495 14.0803C22.2776 14.2703 22.4306 14.5353 22.4813 14.8277C22.532 15.1202 22.477 15.4212 22.3261 15.6769L20.324 19.1409C20.3217 19.1442 20.3197 19.1477 20.3179 19.1512C20.1662 19.4034 19.931 19.5944 19.6532 19.6911C19.3753 19.7879 19.0723 19.7843 18.7969 19.6809L18.7804 19.6748L17.0428 18.975C16.933 18.9306 16.8143 18.913 16.6964 18.9235C16.5784 18.934 16.4647 18.9724 16.3645 19.0355C16.2108 19.1327 16.0545 19.2242 15.8958 19.3102C15.7928 19.366 15.7045 19.4452 15.6378 19.5414C15.5711 19.6377 15.528 19.7482 15.5119 19.8642L15.2512 21.72L15.2456 21.7537C15.1885 22.0417 15.0338 22.3011 14.8077 22.4882C14.5816 22.6754 14.2979 22.7789 14.0044 22.7812H9.9956C9.69844 22.7803 9.41115 22.6745 9.18435 22.4825C8.95754 22.2905 8.80576 22.0246 8.75576 21.7317L8.75154 21.7055L8.49045 19.8459C8.47418 19.7301 8.43103 19.6196 8.36445 19.5234C8.29787 19.4272 8.20971 19.3479 8.10701 19.2919C7.9467 19.2056 7.79013 19.1142 7.63826 19.0191C7.53826 18.9564 7.4248 18.9183 7.30722 18.9079C7.18963 18.8976 7.07127 18.9153 6.96185 18.9595L5.22138 19.6603L5.20498 19.6669C4.92912 19.7705 4.62563 19.7741 4.34741 19.677C4.06919 19.5798 3.83387 19.3881 3.68248 19.1353C3.68062 19.1318 3.67859 19.1283 3.67638 19.125L1.67435 15.6614C1.52297 15.4055 1.46761 15.1041 1.5182 14.8112C1.56879 14.5182 1.72202 14.2528 1.95045 14.0625V14.0625ZM8.2542 12.1763C8.28833 12.9021 8.53264 13.6025 8.95742 14.1921C9.3822 14.7817 9.96915 15.2352 10.6469 15.4974C11.3246 15.7597 12.064 15.8193 12.775 15.6692C13.486 15.519 14.138 15.1655 14.6519 14.6516C15.1657 14.1377 15.5191 13.4856 15.6692 12.7746C15.8193 12.0635 15.7595 11.3242 15.4972 10.6465C15.2349 9.96881 14.7814 9.38192 14.1917 8.95721C13.602 8.5325 12.9017 8.28827 12.1758 8.25422C11.6546 8.23127 11.1344 8.31702 10.6482 8.50601C10.162 8.695 9.72045 8.98309 9.35161 9.35197C8.98278 9.72085 8.69474 10.1624 8.50581 10.6487C8.31688 11.1349 8.23119 11.6551 8.2542 12.1763V12.1763Z"
          fill={color}
        />
      </Svg>
    );
  }
  return (
    <Svg width="28" height="28" viewBox="0 0 24 24">
      <Path
        d="M12.2948 14.9855C11.6793 15.0463 11.06 14.9153 10.5218 14.6106C9.98353 14.3058 9.55266 13.8421 9.28813 13.283C9.02361 12.7239 8.93836 12.0967 9.04406 11.4873C9.14976 10.8779 9.44125 10.316 9.87861 9.87867C10.316 9.44131 10.8778 9.14983 11.4872 9.04413C12.0967 8.93842 12.7239 9.02367 13.283 9.2882C13.8421 9.55272 14.3057 9.9836 14.6105 10.5218C14.9152 11.06 15.0462 11.6793 14.9854 12.2948C14.9161 12.9849 14.6104 13.6297 14.12 14.1201C13.6296 14.6104 12.9848 14.9162 12.2948 14.9855V14.9855ZM19.5182 12C19.5163 11.6739 19.4923 11.3483 19.4465 11.0255L21.5657 9.36328C21.658 9.28679 21.7202 9.18006 21.7412 9.06205C21.7622 8.94405 21.7407 8.82241 21.6806 8.71875L19.6757 5.25C19.6148 5.14734 19.5197 5.06946 19.407 5.0301C19.2943 4.99074 19.1713 4.99242 19.0598 5.03484L16.9551 5.88234C16.839 5.92856 16.7133 5.94525 16.5892 5.93093C16.4651 5.91662 16.3465 5.87174 16.244 5.80031C15.9228 5.57912 15.5853 5.38262 15.2343 5.2125C15.124 5.15888 15.0285 5.07891 14.9564 4.97966C14.8843 4.88042 14.8378 4.76494 14.8209 4.64344L14.5054 2.39859C14.4847 2.28004 14.4234 2.17236 14.3321 2.09396C14.2408 2.01556 14.1251 1.9713 14.0048 1.96875H9.99509C9.87675 1.9708 9.76264 2.01309 9.67155 2.08867C9.58047 2.16425 9.51784 2.2686 9.494 2.38453L9.179 4.62609C9.16131 4.74894 9.11354 4.86551 9.03994 4.96544C8.96634 5.06537 8.86919 5.14557 8.75712 5.19891C8.4066 5.3681 8.07021 5.56514 7.75118 5.78813C7.64904 5.85919 7.53082 5.90373 7.40717 5.91772C7.28353 5.93172 7.15835 5.91473 7.0429 5.86828L4.93868 5.02125C4.82717 4.97879 4.70425 4.97704 4.59158 5.01631C4.4789 5.05558 4.3837 5.13336 4.32275 5.23594L2.3179 8.70469C2.25763 8.80832 2.23609 8.92999 2.25712 9.04802C2.27815 9.16604 2.34039 9.27278 2.43275 9.34922L4.22384 10.7555C4.32197 10.8334 4.39909 10.9345 4.4482 11.0498C4.49732 11.165 4.51687 11.2907 4.50509 11.4155C4.48822 11.6109 4.4779 11.8059 4.4779 12.0014C4.4779 12.1969 4.48775 12.3891 4.50509 12.5803C4.51558 12.7043 4.49507 12.8289 4.4454 12.943C4.39573 13.0571 4.31846 13.157 4.22056 13.2338L2.4304 14.64C2.33954 14.7168 2.27862 14.8232 2.2583 14.9404C2.23799 15.0577 2.25959 15.1783 2.31931 15.2812L4.32415 18.75C4.38504 18.8527 4.48021 18.9305 4.59289 18.9699C4.70557 19.0093 4.82853 19.0076 4.94009 18.9652L7.04478 18.1177C7.16084 18.0714 7.28656 18.0547 7.41066 18.0691C7.53476 18.0834 7.65338 18.1283 7.75587 18.1997C8.07708 18.4209 8.41461 18.6174 8.76556 18.7875C8.87589 18.8411 8.97132 18.9211 9.04343 19.0203C9.11553 19.1196 9.16209 19.2351 9.179 19.3566L9.49447 21.6014C9.51519 21.72 9.57644 21.8276 9.66775 21.906C9.75906 21.9844 9.87476 22.0287 9.99509 22.0312H14.0048C14.1231 22.0292 14.2372 21.9869 14.3283 21.9113C14.4194 21.8357 14.482 21.7314 14.5059 21.6155L14.8209 19.3739C14.8386 19.2511 14.8863 19.1345 14.9599 19.0346C15.0335 18.9346 15.1307 18.8544 15.2427 18.8011C15.5933 18.6319 15.9297 18.4349 16.2487 18.2119C16.3508 18.1408 16.469 18.0963 16.5927 18.0823C16.7163 18.0683 16.8415 18.0853 16.957 18.1317L19.0612 18.9787C19.1727 19.0212 19.2956 19.023 19.4083 18.9837C19.521 18.9444 19.6162 18.8666 19.6771 18.7641L21.682 15.2953C21.7422 15.1917 21.7638 15.07 21.7428 14.952C21.7217 14.834 21.6595 14.7272 21.5671 14.6508L19.776 13.2445C19.6775 13.1669 19.5999 13.0658 19.5504 12.9506C19.5008 12.8353 19.4809 12.7095 19.4924 12.5845C19.5079 12.3905 19.5182 12.1955 19.5182 12Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
