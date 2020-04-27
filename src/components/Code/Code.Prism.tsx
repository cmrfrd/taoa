import Icons from '@icons';
import mediaqueries from '@styles/media';
import { ITAOAThemeUIContext } from '@types';
import { copyToClipboard } from '@utils/index';

import styled from '@emotion/styled';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/oceanicNext';
import React, { useState } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

interface ICopyProps {
  toCopy: string;
}

/** Copy is a widget for copying code snippets
 */
const Copy: React.FC<ICopyProps> = ({ toCopy }: ICopyProps) => {
  const [hasCopied, setHasCopied] = useState<boolean>(false);

  function copyToClipboardOnClick(): null {
    if (hasCopied) return;

    copyToClipboard(toCopy);
    setHasCopied(true);

    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }

  return (
    <CopyButton onClick={copyToClipboardOnClick} data-a11y="false">
      {hasCopied ? (
        <>
          Copied <Icons.Copied fill="#6f7177" />
        </>
      ) : (
        <>
          Copy <Icons.Copy fill="#6f7177" />
        </>
      )}
    </CopyButton>
  );
};

const RE = /{([\d,-]+)}/;

/** calculateLinesToHighlight is a function when provided a number
 *  will return a function that returns if that number should be highlighted
 */
function calculateLinesToHighlight(meta: string): (n: null | number) => boolean {
  if (RE.test(meta)) {
    const lineNumbers = RE.exec(meta)[1]
      .split(',')
      .map((v: string) => v.split('-').map((y: string) => parseInt(y, 10)));

    return (index: number): boolean => {
      const lineNumber = index + 1;
      const inRange = lineNumbers.some(([start, end]: number[]) =>
        end ? lineNumber >= start && lineNumber <= end : lineNumber === start
      );
      return inRange;
    };
  } else {
    return (): boolean => false;
  }
}

interface ICodePrismProps {
  codeString: string;
  language: Language;
  metastring?: string;
}

/** CodePrism is a component that syntax highlights code snippets
 */
const CodePrism: React.FC<ICodePrismProps> = ({
  codeString,
  language,
  metastring,
  ...props
}: ICodePrismProps) => {
  const shouldHighlightLine = calculateLinesToHighlight(metastring);

  if (props['live']) {
    return (
      <Container>
        <LiveProvider code={codeString} noInline={true} theme={theme}>
          <LiveEditor style={{ marginBottom: '3px', borderRadius: '2px' }} />
          <LivePreview style={{ fontSize: '18px', borderRadius: '2px' }} />
          <LiveError style={{ color: 'tomato' }} />
        </LiveProvider>
      </Container>
    );
  } else {
    return (
      <Highlight {...defaultProps} code={codeString} language={language}>
        {({ className, tokens, getLineProps, getTokenProps }: any): React.ReactElement => {
          return (
            <div style={{ overflow: 'auto' }}>
              <pre className={className} style={{ position: 'relative' }}>
                <Copy toCopy={codeString} />
                {tokens.map((line: string[], index: number) => {
                  const { className } = getLineProps({
                    line,
                    key: index,
                    className: shouldHighlightLine(index) ? 'highlight-line' : ''
                  });

                  return (
                    <div key={index} className={className}>
                      <span className="number-line">{index + 1}</span>
                      {line.map((token: string, key: number) => {
                        const { className, children } = getTokenProps({
                          token,
                          key
                        });

                        return (
                          <span key={key} className={className}>
                            {children}
                          </span>
                        );
                      })}
                    </div>
                  );
                })}
              </pre>
            </div>
          );
        }}
      </Highlight>
    );
  }
};

export default CodePrism;

const CopyButton = styled.button((p: ITAOAThemeUIContext) => ({
  position: 'absolute',
  right: '22px',
  top: '24px',
  padding: '8px 12px 7px',
  borderRadius: '5px',
  color: '#6f7177',
  transition: 'background 0.3s ease',

  '&:hover': {
    background: 'rgba(255, 255, 255, 0.07)'
  },

  "&[data-a11y='true']:focus::after": {
    content: '',
    position: 'absolute',
    left: '-2%',
    top: '-2%',
    width: '104%',
    height: '104%',
    border: `2px solid ${p.theme.colors.accent}`,
    borderRadius: '5px',
    background: 'rgba(255, 255, 255, 0.01)'
  }
}));

const Container = styled.div((p: ITAOAThemeUIContext) => ({
  overflow: 'scroll',
  width: '100%',
  maxWidth: '750px',
  margin: '0 auto',
  fontSize: '13px',
  borderRadius: '5px',
  fontFamily: `${p.theme.fonts.monospace} !important`,

  'textarea, pre': {
    padding: '32px !important',
    fontFamily: `${p.theme.fonts.monospace} !important`
  },

  [mediaqueries.desktop()]: {
    left: '-26px'
  },

  [mediaqueries.tablet()]: {
    maxWidth: '526px',
    left: 0,

    'textarea,pre': {
      padding: '20px !important'
    }
  },

  [mediaqueries.phablet()]: {
    borderRadius: 0,
    margin: '0 auto 25px',
    overflow: 'initial',
    width: 'unset',
    maxWidth: 'unset',
    float: 'left',
    minWidth: '100%',
    position: 'relative'
  }
}));
