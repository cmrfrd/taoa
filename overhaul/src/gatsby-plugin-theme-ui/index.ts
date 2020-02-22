import merge from 'lodash/merge';

import colors from './colors';
import tags from './tags';

const breakpoints = [
    ['phone_small', 320],
    ['phone', 376],
    ['phablet', 540],
    ['tablet', 735],
    ['desktop', 1070],
    ['desktop_medium', 1280],
    ['desktop_large', 1440],
];

const fonts = {
    serif: `"IBM Plex Sans", -apple-system, BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"`,
    sansSerif: `"IBM Plex Sans", -apple-system, BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"`,
    monospace: `"Operator Mono", Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace`,
    heebo: `"Heebo"`
};

const colorModeTransition =
    'background 0.25s var(--ease-in-out-quad), color 0.25s var(--ease-in-out-quad)';

export default merge({
    initialColorMode: 'light',
    useCustomProperties: true,
    colorModeTransition,
    colors,
    fonts,
    breakpoints,
    tags,
});
