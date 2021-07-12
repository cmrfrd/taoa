import theme from '../gatsby-plugin-theme-ui';

import { css } from '@emotion/react';
import { SerializedStyles } from '@emotion/serialize';

const toEm = (size: number): string => size / 16 + 'em';

/**
 * All breakpoints can be found inside of theme.breakpoints.
 * Each is turned in to a min + 1 and max-width version.
 *
 * There are also break points to cover coarse and fine pointer devices
 *
 * @example
 *
 *    ${mediaqueries.phone` width: 100px; `};
 *    ${mediaqueries.tablet_up` width: 200px; `};
 *
 * It's also useful to just extract the media query for a device to
 * prevent nested string literals.
 */

const mediaqueries = theme.breakpoints.reduce(
  (acc: object, [label, size]: Array<number>, i: number) => ({
    ...acc,
    // max-width media query e.g. mediaqueries.desktop
    [label]: (...args: any[]): SerializedStyles => css`
      @media (max-width: ${toEm(size)}) {
        ${css(...args)};
      }
    `,
    // min-width media query e.g. mediaqueries.desktop_up
    // This is the breakpoint prior's size +1
    [`${label}_up`]: (...args: any[]): SerializedStyles => css`
      @media (min-width: ${toEm(theme.breakpoints[i - 1][1] + 1)}) {
        ${css(...args)};
      }
    `
  }),
  {}
);

export const mediaqueriesobj = theme.breakpoints.reduce(
  (acc: object, [label, size]: Array<number>, i: number) => ({
    ...acc,
    // max-width media query e.g. mediaqueries.desktop
    [label]: (...args: any[]): object => ({
      [`@media (max-width: ${toEm(size)})`]: {
        ...args
      }
    }),
    // min-width media query e.g. mediaqueries.desktop_up
    // This is the breakpoint prior's size +1
    [`${label}_up`]: (...args: any[]): object => ({
      [`@media (min-width: ${toEm(theme.breakpoints[i - 1][1] + 1)})`]: {
        ...args
      }
    })
  }),
  {}
);

export const mediaquery = theme.breakpoints.reduce(
  (acc: object, [label, size]: Array<number>) => ({
    ...acc,
    // max-width media query e.g. mediaqueries.desktop
    [label]: (): string => `
          @media (max-width: ${toEm(size)})
        `
  }),
  {}
);

export const mediaqueryup = theme.breakpoints.reduce(
  (acc: object, [label]: Array<number>, i: number) => ({
    ...acc,
    // max-width media query e.g. mediaqueries.desktop
    [label]: (): string => `
          @media (min-width: ${toEm(theme.breakpoints[i - 1][1] + 1)})
        `
  }),
  {}
);

export const media = mediaqueries;

export default mediaqueries;
