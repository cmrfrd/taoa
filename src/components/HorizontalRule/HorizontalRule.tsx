import { mediaquery } from '@styles/media';
import { ITAOAThemeUIContext } from '@types';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

/* This component is a simple horizontal line
 * to divide one section from another
 */
const HorizontalRule = styled.hr((p: ITAOAThemeUIContext) =>
  css({
    position: 'relative',
    width: '100%',
    maxWidth: '900px',
    margin: '50px auto',
    border: 0,
    height: '14.36px',
    backgroundImage: `url("
        ${
          p.isDark
            ? "data:image/svg+xml,<svg width='10' height='15' viewBox='0 0 10 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0.432617' y='13.8564' width='16' height='1' transform='rotate(-60 0.432617 13.8564)' fill='%2350525B'/></svg>"
            : "data:image/svg+xml,<svg width='10' height='15' viewBox='0 0 10 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0.567383' y='14.1777' width='16' height='1' transform='rotate(-60 0.567383 14.1777)' fill='%232D2E33'/></svg>"
        }
    ")`,

    backgroundRepeat: 'repeat-x',
    boxSizing: 'border-box',
    backgroundPosition: 'center',

    [mediaquery.desktop()]: {
      maxWidth: '70vw'
    },

    [mediaquery.tablet()]: {
      maxWidth: '70vw'
    },

    [mediaquery.phablet()]: {
      maxWidth: '80vw',
      padding: '0 20px'
    },

    [mediaquery.tablet()]: {
      margin: '50px auto 50px'
    }
  })
);

export default HorizontalRule;
