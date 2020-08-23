import { ITAOAThemeUIContext } from '@types';

import styled from '@emotion/styled';

const Head = styled.thead((p: ITAOAThemeUIContext) => ({
  textAlign: 'left',
  borderCollapse: 'collapse',
  position: 'relative',
  lineHeight: 1.756,
  fontWeight: 600,
  color: p.theme.colors.primary,
  fontFamily: p.theme.fonts.serif,
  transition: p.theme.colorModeTransition
}));

export default Head;
