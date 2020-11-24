import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import EmojioneV4, { Props } from 'react-emoji-render';

const nameQuery = graphql`
  {
    site {
      siteMetadata {
        emojiDir
      }
    }
  }
`;

const emojiDir = (): string => useStaticQuery(nameQuery).site.siteMetadata.emojiDir;

const Emoji: React.FC<Props> = (props: Props): JSX.Element => {
  const { text, options } = props;

  return (
    <EmojioneV4
      options={{
        protocol: 'https',
        baseUrl: `/${emojiDir()}/png/`,
        ext: 'png',
        size: '128',
        ...options
      }}
      text={text}
      onlyEmojiClassName="make-emojis-large"
    />
  );
};

export default Emoji;
