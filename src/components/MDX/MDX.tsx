import Anchor from '@components/Anchor';
import Blockquote from '@components/Blockquote';
import Button, { SmallButton, MediumButton, LargeButton } from '@components/Button';
import Code from '@components/Code';
import ConfettiButton from '@components/ConfettiButton';
import Figcaption from '@components/Figcaption';
import Headings from '@components/Headings';
import HorizontalRule from '@components/HorizontalRule';
import { ImageZoom } from '@components/Image';
import Lists from '@components/Lists';
import Paragraph from '@components/Paragraph';
import Tables from '@components/Tables';
import { mediaquery } from '@styles/media';
import { ITAOAThemeUIContext } from '@types';
import { Miner, WalletState } from '@components/Miner';

import styled from '@emotion/styled';
import { MDXProvider } from '@mdx-js/react';
import React from 'react';
import { useColorMode } from 'theme-ui';

import 'katex/dist/katex.min.css';

type ComponentType =
  | 'img'
  | 'a'
  | 'blockquote'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'hr'
  | 'ul'
  | 'ol'
  | 'p'
  | 'code'
  | 'pre'
  | 'table'
  | 'thead'
  | 'th'
  | 'td'
  | 'figcaption';
type Components = {
  [key in ComponentType | string]?:
    | React.ComponentType<{ children: React.ReactNode }>
    | React.FC<any>;
};

const components: Components = {
  img: ImageZoom,
  a: Anchor,
  blockquote: Blockquote,
  h1: Headings.h2, // h1 reserved post title
  h2: Headings.h2,
  h3: Headings.h3,
  h4: Headings.h4,
  h5: Headings.h5,
  h6: Headings.h6,
  hr: HorizontalRule,
  ul: Lists.ul,
  ol: Lists.ol,
  p: Paragraph,
  code: Code.Prism,
  pre: Code.Pre,
  table: Tables.Table,
  thead: Tables.Head,
  th: Tables.HeadCell,
  td: Tables.Cell,
  figcaption: Figcaption,
  Button,
  SmallButton,
  MediumButton,
  LargeButton,
  ConfettiButton,
  Miner,
  WalletState
  /*   CodeEditorWithOutput */
};

interface IMDXProps {
  content: string;
  children: React.ReactNode;
}

interface IStringMap {
  [key: string]: string | number | boolean | IStringMap;
}

const MDX: React.FC<IMDXProps> = ({ content, children }: IMDXProps) => {
  const [colorMode] = useColorMode();

  return (
    <MDXProvider components={components}>
      <MDXBody>{children}</MDXBody>
    </MDXProvider>
  );
};

export default MDX;

const IMAGE_WIDTHS = (): IStringMap => ({
  regular: '680px',
  large: '1004px',
  full: '100vw'
});

const POST_WIDTH = (): IStringMap => ({
  width: '100%',
  maxWidth: '780px',

  [mediaquery.desktop()]: {
    maxWidth: '607px'
  },

  [mediaquery.tablet()]: {
    maxWidth: '586px'
  }
});

const BodyCSS = (): IStringMap => ({
  'h1, h2, h3, h4, h5, h6, p, ul, ol, blockquote': {
    margin: '10px auto',
    ...POST_WIDTH()
  },

  'h1, h2, h3, h4, h5, h6, p': {
    [mediaquery.phablet()]: {
      paddingLeft: '20px',
      paddingRight: '20px'
    }
  },

  'h1, h1 *, h2, h2 *': {
    margin: '25px auto 18px',

    [mediaquery.tablet()]: {
      margin: '30px auto 18px'
    }
  },

  'h3, h3 *': {
    margin: '20px auto 10px'
  }
});

const PrismCSS = (p: ITAOAThemeUIContext): IStringMap => ({
  '.prism-code': {
    overflow: 'auto',
    width: '100%',
    maxWidth: '744px',
    padding: '32px',
    fontSize: '13px',
    margin: '15px auto 50px',
    borderRadius: '5px',
    fontFamily: p.theme.fonts.monospace,
    background: p.theme.colors.prism.background,

    '.token-line': {
      borderLeft: '3px solid transparent',

      ...Object.keys(p.theme.colors.prism)
        .map((key: string) => {
          return {
            [`.${key}`]: {
              color: p.theme.colors.prism[key]
            }
          };
        })
        .reduce((curr: IStringMap, next: IStringMap) => ({ ...curr, ...next }), {}),

      '& > span': {}
    },

    '.number-line': {
      display: 'inline-block',
      width: '32px',
      userSelect: 'none',
      opacity: 0.3,
      color: '#dcd9e6',

      [mediaquery.tablet()]: {
        opacity: 0,
        width: 0
      }
    },

    '.token-line.highlight-line': {
      margin: '0 -32px',
      padding: '0 32px',
      background: p.theme.colors.prism.highlight,
      borderLeft: `3px solid p.theme.colors.prism.highlightBorder`,

      [mediaquery.tablet()]: {
        margin: '0 -20px',
        padding: '0 20px'
      }
    },

    '.operator + .maybe-class-name': {
      color: '#ffcf74 !important'
    },

    '.plain ~ .operator': {
      color: '#5fa8aa !important'
    },

    [mediaquery.desktop()]: {
      left: '0px'
    },

    [mediaquery.tablet()]: {
      maxWidth: '526px',
      padding: '20px 20px',
      left: 0
    },

    [mediaquery.phablet()]: {
      textSizeAdjust: 'none',
      borderRadius: 0,
      margin: '0 auto 25px',
      padding: '25px 20px',
      width: 'unset',
      maxWidth: 'unset',
      float: 'left',
      minWidth: '100%',
      overflow: 'initial',
      position: 'relative'
    }
  }
});

const ImageCSS = (): IStringMap => ({
  '.gatsby-resp-image-background-image': {
    display: 'none !important'
  },

  img: {
    display: 'inline-block',
    position: 'relative',
    maxWidth: '100%',
    height: 'auto',
    zIndex: 0,
    margin: '15px auto 50px',
    borderRadius: '5px',

    [mediaquery.tablet()]: {
      margin: '10px auto 45px'
    }
  },

  'div.Image__Small': {
    display: 'inline-block',
    position: 'relative',
    height: 'auto',
    zIndex: 0,
    margin: '15px auto 50px',
    borderRadius: '5px',
    width: '100%',
    maxWidth: '680px',

    [mediaquery.tablet()]: {
      margin: '10px auto 45px'
    },

    [mediaquery.desktop()]: {
      maxWidth: '507px'
    },

    [mediaquery.tablet()]: {
      maxWidth: '486px',
      margin: '0 auto 25px'
    },

    [mediaquery.phablet()]: {
      padding: '0 20px'
    }
  },

  '.Image__Container': {
    textAlign: 'center'
  },

  'img.Image__With-Shadow': {
    boxShadow: '0px 15px 60px rgba(0, 0, 0, 0.15)'
  },

  'div.Image__Medium': {
    position: 'relative',
    margin: '15px auto 50px',
    width: '100%',
    maxWidth: IMAGE_WIDTHS().large,

    [mediaquery.desktop_medium()]: {
      left: '-34px'
    },

    [mediaquery.desktop()]: {
      left: '-26px'
    },

    [mediaquery.tablet()]: {
      borderRadius: 0,
      left: 0,
      margin: '0 auto 25px',

      img: {
        borderRadius: 0
      }
    }
  },

  'div.Image__Large': {
    position: 'relative',
    left: '-68px',
    width: IMAGE_WIDTHS().full,
    margin: '25px auto 60px',
    pointerEvents: 'none',

    img: {
      borderRadius: 0
    },

    [mediaquery.desktop()]: {
      left: '-53px'
    },

    [mediaquery.tablet()]: {
      left: 0,
      margin: '0 auto 25px'
    }
  }
});

/**
 * MDXBody
 * Here we're applying "global" selectors to make sure we maintain an post
 * body type feel. We're also applying all the Prism selecotors and styles within
 * the MDXBody.
 */
const MDXBody = styled.div(
  (p: ITAOAThemeUIContext): IStringMap => ({
    // using this css class shim so dark mode
    // with katex display mode works
    '.katex-display': {
      color: p.theme.colors.postText,
      padding: '1em 1em',
      overflow: 'auto hidden'
    },

    position: 'relative',
    zIndex: 10,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',

    ...BodyCSS(),
    ...ImageCSS(),

    ...PrismCSS(p)
  })
);
