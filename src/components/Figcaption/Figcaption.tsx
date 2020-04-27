import { TAOAThemeUIContext } from '@types';

import styled from '@emotion/styled';
import * as CSS from 'csstype';

/** Figcaption */
const Figcaption = styled.figcaption((p: TAOAThemeUIContext) => ({
  color: p.theme.colors.grey as CSS.ColorProperty,
  fontSize: '14px',
  textAlign: 'center',
  width: '100%',
  paddingTop: '6px'
}));

export default Figcaption;
