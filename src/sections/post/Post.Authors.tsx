import Image from '@components/Image';
import Icons from '@icons';
import mediaqueries, { mediaquery } from '@styles/media';
import { IAuthor, ITAOAThemeUIContext } from '@types';

import styled from '@emotion/styled';
import * as CSS from 'csstype';
import { Link } from 'gatsby';
import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { useColorMode } from 'theme-ui';

/**
 * When generating the author names we're also checking to see how long the
 * number of authors are. If it's only 2 authors we'll show the fullnames.
 * Otherwise it'll only preview the first names of each author.
 */
function generateAuthorNames(authors: IAuthor[]): string {
  return authors
    .map((author: IAuthor) => {
      if (authors.length > 2) {
        return author.name.split(' ')[0];
      } else {
        return author.name;
      }
    })
    .join(', ');
}

interface IAuthorsProps {
  authors: IAuthor[];
}

const CoAuthors: React.FC<IAuthorsProps> = ({ authors }: IAuthorsProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [colorMode] = useColorMode();
  const names = generateAuthorNames(authors);

  const fill = colorMode === 'dark' ? '#fff' : '#000';
  const listWidth = { width: `${10 + authors.length * 15}px` };

  return (
    <CoAuthorsContainer onClick={(): void => setIsOpen(!isOpen)} isOpen={isOpen}>
      <CoAuthorsList style={listWidth}>
        {authors.map((author: IAuthor, index: number) => (
          <CoAuthorAvatar style={{ left: `${index * 15}px` }} key={author.name}>
            <RoundedImage src={author.avatar.small} />
          </CoAuthorAvatar>
        ))}
      </CoAuthorsList>
      <NameContainer>{names}</NameContainer>
      <IconContainer>
        <Icons.ToggleOpen fill={fill} />
      </IconContainer>

      {isOpen && (
        <OutsideClickHandler onOutsideClick={(): void => setIsOpen(!isOpen)}>
          <CoAuthorsListOpen>
            <IconOpenContainer>
              <Icons.ToggleClose fill={fill} />
            </IconOpenContainer>
            {authors.map((author: IAuthor) => (
              <CoAuthorsListItemOpen key={author.name}>
                <AuthorLink to={`/about`}>
                  <CoAuthorAvatarOpen>
                    <RoundedImage src={author.avatar.small} />
                  </CoAuthorAvatarOpen>
                  <AuthorNameOpen>{author.name}</AuthorNameOpen>
                </AuthorLink>
              </CoAuthorsListItemOpen>
            ))}
          </CoAuthorsListOpen>
        </OutsideClickHandler>
      )}
    </CoAuthorsContainer>
  );
};

const PostAuthors: React.FC<IAuthorsProps> = ({ authors }: IAuthorsProps) => {
  const hasCoAuthors = authors.length > 1;

  // Special dropdown UI for multiple authors
  if (hasCoAuthors) {
    return <CoAuthors authors={authors} />;
  } else {
    return (
      <AuthorLink to={`/about`}>
        <AuthorAvatar>
          <RoundedImage src={authors[0].avatar.small} />
        </AuthorAvatar>
        <strong>{authors[0].name}</strong>
      </AuthorLink>
    );
  }
};

export default PostAuthors;

const AuthorAvatar = styled.div((p: ITAOAThemeUIContext) => ({
  height: '25px',
  width: '25px',
  borderRadius: '50%',
  marginRight: '14px',
  background: p.theme.colors.grey as CSS.ColorProperty,

  [mediaqueries.phablet()]: {
    overflow: 'visible',
    marginTop: '10px'
  }
}));

const RoundedImage = styled(Image)({
  borderRadius: '50%'
});

const AuthorLink = styled(Link)((p: ITAOAThemeUIContext) => ({
  display: 'flex',
  alignItems: 'center',
  color: 'inherit',

  strong: {
    transition: p.theme.colorModeTransition
  },

  '&:hover strong': {
    color: p.theme.colors.primary as CSS.ColorProperty
  }
}));

const CoAuthorsList = styled.div({
  position: 'relative',
  height: '25px',
  marginRight: '15px'
});

const CoAuthorsListOpen = styled.ul((p: ITAOAThemeUIContext) => ({
  position: 'absolute',
  zIndex: 2,
  left: '-21px',
  right: '-21px',
  top: '-19px',
  padding: '21px',
  background: p.theme.colors.card as CSS.ColorProperty,
  boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
  borderRadius: '5px',
  cursor: 'pointer',
  listStyle: 'none',
  transform: 'translateY(-2px)'
}));

const CoAuthorsListItemOpen = styled.li({
  a: {
    width: '100%'
  },

  '&:not(:last-child)': {
    marginBottom: '10px'
  }
});

const CoAuthorAvatarOpen = styled.div((p: ITAOAThemeUIContext) => ({
  height: '25px',
  width: '25px',
  borderRadius: '50%',
  marginRight: '15px',
  background: p.theme.colors.grey as CSS.ColorProperty,
  overflow: 'hidden',
  pointerEvents: 'none',

  '.gatsby-image-wrapper > div': {
    paddingBottom: '100% !important',
    overflow: 'hidden'
  }
}));

const CoAuthorAvatar = styled.div((p: ITAOAThemeUIContext) => ({
  position: 'absolute',
  height: '25px',
  width: '25px',
  borderRadius: '50%',
  zIndex: 1,
  background: p.theme.colors.grey as CSS.ColorProperty,
  boxShadow: `0 0 0 2px ${p.theme.colors.background}`,
  transition: 'box-shadow 0.25s ease',
  overflow: 'hidden',
  pointerEvents: 'none',

  '.gatsby-image-wrapper > div': {
    paddingBottom: '100% !important',
    overflow: 'hidden'
  },

  [mediaquery.phablet()]: {
    display: 'none'
  }
}));

const NameContainer = styled.strong({
  position: 'relative',
  maxWidth: '260px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  fontWeight: 600,
  cursor: 'pointer',

  [mediaquery.desktop()]: {
    maxWidth: '120px'
  },

  [mediaquery.phablet()]: {
    maxWidth: '200px'
  }
});

const AuthorNameOpen = styled.strong((p: ITAOAThemeUIContext) => ({
  position: 'relative',
  cursor: 'pointer',
  color: p.theme.colors.secondary as CSS.ColorProperty,
  fontWeight: 600
}));

const IconContainer = styled.div({
  position: 'relative',
  cursor: 'pointer',
  marginLeft: '10px',

  [mediaquery.phablet()]: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    top: '10px',
    height: '100%'
  }
});

const IconOpenContainer = styled.div({
  position: 'absolute',
  cursor: 'pointer',
  top: '20px',
  right: '21px'
});

interface ICoAuthorsContainer extends ITAOAThemeUIContext {
  isOpen: boolean;
}

const CoAuthorsContainer = styled.div(
  (p: ICoAuthorsContainer) => `
  position: relative;
  display: flex;
  align-items: center;
  font-size: 18px;
  color: ${p.theme.colors.grey};
  cursor: pointer;

  &::before {
    content: '" "';
    position: absolute;
    left: -20px;
    right: -8px;
    top: -16px;
    bottom: -16px;
    background: ${p.theme.colors.card};
    box-shadow: ${p.isOpen ? 'none' : ' 0px 0px 15px rgba(0, 0, 0, 0.1)'};
    border-radius: 5px;
    z-index: 0;
    transition: opacity 0.3s;
    cursor: pointer;
    opacity: 0;
  }

  &:hover::before {
    opacity: 1;
  }

  ${mediaquery.phablet()} {
      font-size: 14px;
      align-items: center;
      &::before {
          box-shadow: none;
          bottom: -30px;
          background: transparent;
      }
      strong {
          margin-left: 10px;
          display: block;
          font-weight: semi-bold;
          margin-bottom: 5px;
      }
  }
    `
);

const HideOnMobile = styled.span({
  [mediaquery.phablet()]: {
    display: 'none'
  }
});
