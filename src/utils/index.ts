import t from '../gatsby-plugin-theme-ui';

import throttle from 'lodash/throttle';
import { useEffect, useState } from 'react';

export const theme = t;

interface IHW {
  height: number;
  width: number;
}

/**
 * Clamp a number between min and max
 *
 * @param {number} value The number you want clamped
 * @param {number} min
 * @param {number} max
 *
 * @example
 *    clamp(5, 1, 10) 5
 *    clamp(50, 1, 10) 10
 *    clamp(0.5, 1, 10) 1
 */
export const clamp = (value: number, min: number, max: number): number =>
  value < min ? min : value > max ? max : value;

/**
 * Create an array of numbers len elements long
 *
 * @param {number} start Start of you range
 * @param {number} len How many items of step 1 do you want in the range?
 * @param {number} step Defaults to incrementing every 1
 *
 * @example
 *    range(1, 5) [1, 2, 3, 4, 5]
 *    range(3, 5) [3, 4, 5, 6, 7]
 *    range(1, 5, 0.1) [1, 1.1, 1.2, 1.3, 1.4]
 */
export const range = (start: number, len: number, step: number = 1): Array<number> =>
  len
    ? new Array(len).fill(undefined).map((_: any, i: number) => +(start + i * step).toFixed(4))
    : [];

/**
 * Debounce a fn by a given number of ms
 *
 * @see {@link https://medium.com/@TCAS3/debounce-deep-dive-javascript-es6-e6f8d983b7a1}
 * @param {function} fn Function you want to debounce
 * @param {number} time Amount in ms to debounce. Defaults to 100ms
 * @returns {function} Your function debounced by given ms
 */
export const debounce = (fn: () => any, time: number = 100, ...args: any): (() => void) => {
  let timeout: ReturnType<typeof setTimeout>;

  return function (): void {
    const functionCall = (): any => fn.apply(this, args);

    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
};

/**
 * Extract from the theme a specific breakpoint size
 *
 * @param {string} name Name of the breakpoint we wish to retrieve
 *                      All options can be found in styles/theme
 *
 * @example
 *    getBreakpointFromTheme('tablet') 768
 */
// export const getBreakpointFromTheme: (arg0: string) => number = (name: string) => {
//   const brk = t.breakpoints.find((label: string[]): boolean => label === name);
//   return brk && brk[1];
// };
/* eslint-disable */
export const getBreakpointFromTheme: (arg0: string) => number = (name: string) =>
  theme.breakpoints.find(([label, _]) => label === name)![1];
/* eslint-enable */

export const getWindowDimensions = (): IHW => {
  if (typeof window !== 'undefined') {
    const width =
      window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    const height =
      window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    return {
      height,
      width
    };
  }

  return {
    width: 0,
    height: 0
  };
};

export function useResize(): IHW {
  const [dimensions, setDimensions] = useState<IHW>({ width: 1280, height: 900 });

  useEffect(() => {
    const handleResize = throttle(() => setDimensions(getWindowDimensions()), 50);

    window.addEventListener('resize', handleResize);
    return (): void => window.removeEventListener('resize', handleResize);
  });

  return dimensions;
}

/**
 * Enable or disable scrolling behavior. Particularly useful for mobile interactions
 * and toggling of different drawers.
 *
 * @param {string} action enable or disable
 *
 * @example
 *    scrollable('enable') Will allow the user to scroll again
 *    scrollable('disable') Will freeze the screen
 */
export const scrollable = (action: string): void => {
  if (action.toLowerCase() === 'enable') {
    document.body.style.cssText = null;
  } else {
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100%';
  }
};

/**
 * Used in componentDidMount to start an animation.
 * This avoids the annoying behaviour of triggering
 * and animation on mount but it not flowing correctly
 * due to fram timing.
 */
export function startAnimation(callback: () => any): void {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      callback();
    });
  });
}

/**
 * React hook to check whether a component is mounted
 */
export const useMounted = (): any => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
};

/**
 * Returns the X and Y coordinates of a selected piece of Text.
 * This will always return the top left corner of the selection.
 */
export const getHighlightedTextPositioning = (): { x: number; y: number } => {
  const doc: Document = window.document;
  let sel: Selection = doc.getSelection();
  let range: Range;
  let rects: DOMRectList;
  let rect: any = {};

  let x = 0;
  let y = 0;

  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.rangeCount) {
      range = sel.getRangeAt(0).cloneRange();

      if (range.getClientRects) {
        range.collapse(true);
        rects = range.getClientRects();

        if (rects.length > 0) {
          rect = rects[0];
        }

        x = rect.left;
        y = rect.top;
      }

      // Fall back to inserting a temporary element
      if (x === 0 && y === 0) {
        const span = doc.createElement('span');
        if (span.getClientRects) {
          // Ensure span has dimensions and position by
          // adding a zero-width space character
          span.appendChild(doc.createTextNode('\u200b'));
          range.insertNode(span);
          rect = span.getClientRects()[0];
          x = rect.left;
          y = rect.top;
          const spanParent = span.parentNode;
          spanParent.removeChild(span);

          // Glue any broken text nodes back together
          spanParent.normalize();
        }
      }
    }
  }

  return { x, y };
};

function isOrContains(
  node: HTMLElement | Node | (Node & ParentNode),
  container: HTMLElement
): boolean {
  while (node) {
    if (node === container) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}

function elementContainsSelection(el: HTMLElement): boolean {
  let sel: Selection;
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.rangeCount > 0) {
      for (let i = 0; i < sel.rangeCount; ++i) {
        if (!isOrContains(sel.getRangeAt(i).commonAncestorContainer, el)) {
          return false;
        }
      }
      return true;
    }
  }
  return false;
}

export const getSelectionDimensions = (): { height: number; width: number } => {
  const isSelectedInPrism = Array.from(document.getElementsByClassName('prism-code'))
    .map((el: HTMLElement) => elementContainsSelection(el))
    .some((bool: boolean) => bool);

  const isSelectedInPost = Array.from(document.getElementsByTagName('post'))
    .map((el: HTMLElement) => elementContainsSelection(el))
    .some((bool: boolean) => bool);

  /**
   * we don't want to show the PostShare option when it's outside of
   * the post body or within prism code.
   */
  if (isSelectedInPrism || !isSelectedInPost) {
    return {
      width: 0,
      height: 0
    };
  }

  const doc: any = window.document;
  let sel = doc.selection;
  let range: any;

  let width = 0;
  let height = 0;

  if (sel) {
    if (sel.type !== 'Control') {
      range = sel.createRange();
      width = range.boundingWidth;
      height = range.boundingHeight;
    }
  } else if (window.getSelection) {
    sel = window.getSelection();
    if (sel.rangeCount) {
      range = sel.getRangeAt(0).cloneRange();
      if (range.getBoundingClientRect) {
        const rect = range.getBoundingClientRect();
        width = rect.right - rect.left;
        height = rect.bottom - rect.top;
      }
    }
  }

  return { width, height };
};

export function getSelectionText(): string {
  let text = '';
  if (window.getSelection) {
    text = window.getSelection().toString();
  }
  return text;
}

/**
 * Utility function to go from a regular string to a kebabe-case string
 * thisIsMyInput
 * this-is-my-output
 */
export function toKebabCase(str: string): string {
  return str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x: string) => x.toLowerCase())
    .join('-');
}

export function copyToClipboard(toCopy: string): void {
  const el = document.createElement(`textarea`);
  el.value = toCopy;
  el.setAttribute(`readonly`, ``);
  el.style.position = `absolute`;
  el.style.left = `-9999px`;
  document.body.appendChild(el);
  el.select();
  document.execCommand(`copy`);
  document.body.removeChild(el);
}
