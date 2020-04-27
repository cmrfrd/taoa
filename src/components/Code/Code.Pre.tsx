import CodeBlock from './Code.Prism';

import React from 'react';

/** preToCodeBlock creates the props for CodeBlock or pre
 */
function preToCodeBlock(preProps: any): any {
  if (preProps.children && preProps.children.props && preProps.children.props.mdxType === 'code') {
    const { children: codeString, className = '', ...props } = preProps.children.props;

    const matches = className.match(/language-(?<lang>.*)/);

    return {
      codeString: codeString.trim(),
      className,
      language: matches && matches.groups && matches.groups.lang ? matches.groups.lang : '',
      ...props
    };
  }
}

/** CodePre is where code snippets go to be displayed and colored
 */
const CodePre: React.FC<{}> = (preProps: any) => {
  const props = preToCodeBlock(preProps);

  if (props) {
    return <CodeBlock {...props} />;
  } else {
    return <pre {...preProps} />;
  }
};

export default CodePre;
