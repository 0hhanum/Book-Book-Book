import React from "react";
import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { isDefaultThemeAtom } from "../../atoms";
import { useTheme } from "styled-components";

const MailSendSuccessSvg = () => {
  const theme = useTheme();
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="496"
      height="363"
      viewBox="0 0 496 363"
      fill="none"
    >
      <motion.path
        d="M0.799904 357.96C-0.326483 359.176 -0.254584 361.074 0.960495 362.2C2.17557 363.326 4.07371 363.255 5.2001 362.04L0.799904 357.96ZM255.852 236.59C244.301 258.278 222.309 266.432 198.18 269.017C186.148 270.306 173.757 270.188 162.148 269.737C150.653 269.29 139.694 268.5 131 268.5V274.5C139.556 274.5 150.097 275.273 161.915 275.732C173.618 276.187 186.352 276.319 198.82 274.983C223.691 272.318 248.199 263.722 261.148 239.41L255.852 236.59ZM131 268.5C81.7882 268.5 64.3008 273.398 51.5757 288.099C45.5096 295.107 40.4917 304.437 33.3901 315.67C26.1882 327.063 16.5212 341.001 0.799904 357.96L5.2001 362.04C21.2288 344.749 31.114 330.5 38.4617 318.876C45.9096 307.095 50.4386 298.58 56.1122 292.026C66.8664 279.602 81.629 274.5 131 274.5V268.5Z"
        fill={theme.fontColor}
      />
      <motion.path
        d="M257.5 240C281.5 194 271.419 174.249 241 183C204.5 193.5 167 190.5 193.5 237"
        stroke={theme.fontColor}
        stroke-width="6"
      />
      <motion.path
        d="M290.5 136.5C316 93.5 379.88 103 360.5 148.5C345.936 182.693 226.5 289.5 192.5 235.5"
        stroke={theme.fontColor}
        stroke-width="6"
      />
      <motion.path
        d="M493 3C413 42 470 134 383.5 173C351.357 187.492 275 161 291 135.5"
        stroke={theme.fontColor}
        stroke-width="6"
        stroke-linecap="round"
      />
    </motion.svg>
  );
};

export default MailSendSuccessSvg;
