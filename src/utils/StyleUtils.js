import {css} from 'styled-components/native';

export const crossPlatformElevation = (elevation: number = 0, color = 'black') => css`
  /* Android - native default is 4, we're setting to 0 to match iOS. */
  elevation: ${elevation};

  /* iOS - default is no shadow. Only add if above zero */
  ${elevation > 0 &&
  css`
    shadow-color: ${color};
    shadow-offset: 0px ${0.5 * elevation}px;
    shadow-opacity: 0.3;
    shadow-radius: ${0.8 * elevation}px;
  `}
`;
