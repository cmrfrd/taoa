import { mediaquery } from '@styles/media';
import { ITAOAThemeUIContext } from '@types';
import Paragraph from '@components/Paragraph';

import styled from '@emotion/styled';
import * as CSS from 'csstype';

/**
 * Blockquote is a component for display quotes!
 */
const BBlockquote = styled.blockquote((p: ITAOAThemeUIContext) => ({
  transition: p.theme.colorModeTransition,
  color: p.theme.colors.postText as CSS.ColorProperty,
  borderLeft: `10px solid ${p.theme.colors.postText}`,
  '& > p': {
    paddingLeft: '10px'
  }
}));

const Blockquote: React.FC = ({ children }) => {
  return (
    <Paragraph>
      <BBlockquote>{children}</BBlockquote>
    </Paragraph>
  );
};

export default Blockquote;
