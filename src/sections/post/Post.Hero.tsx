import PostAuthors from './Post.Authors';

import Headings from '@components/Headings';
import Image, { ImagePlaceholder } from '@components/Image';
import { mediaquery } from '@styles/media';
import { IPost, IAuthor, ITAOAThemeUIContext } from '@types';

import styled from '@emotion/styled';
import React from 'react';

interface IPostHeroProps {
  post: IPost;
  authors: IAuthor[];
}

const PostHero: React.FC<IPostHeroProps> = ({ post, authors }: IPostHeroProps) => {
  const hasCoAUthors = authors.length > 1;
  const hasHeroImage =
    post.hero && Object.keys(post.hero.full).length !== 0 && post.hero.full.constructor === Object;

  return (
    <Hero>
      <Header>
        <HeroHeading>{post.title}</HeroHeading>
        <HeroSubtitle hasCoAUthors={hasCoAUthors}>
          <PostAuthors authors={authors} />
          <PostMeta hasCoAUthors={hasCoAUthors}>
            {post.date} · {post.timeToRead} min read
          </PostMeta>
        </HeroSubtitle>
      </Header>
      <HeroImage id="PostImage__Hero">
        {hasHeroImage ? <Image src={post.hero.full} /> : <ImagePlaceholder />}
      </HeroImage>
    </Hero>
  );
};

export default PostHero;

const Hero = styled.div(
  (p: ITAOAThemeUIContext) => `
  padding-top: 8rem;
  ${mediaquery.phablet()} {
            &::before {
                content: ' ';
                width: 100%;
                height: 20px;
                background: ${p.theme.colors.primary};
                position: absolute;
                left: 0;
                top: 0;
                transition: ${p.theme.colorModeTransition};
            }

            &::after {
                content: ' ';
                width: 100%;
                height: 10px;
                background: ${p.theme.colors.background};
                position: absolute;
                left: 0;
                top: 10px;
                border-top-left-radius: 25px;
                border-top-right-radius: 25px;
                transition: ${p.theme.colorModeTransition};
            }
   }
    `
);

interface IPostMeta extends ITAOAThemeUIContext {
  hasCoAUthors: boolean;
}
const PostMeta = styled.div((p: IPostMeta) => ({
  marginLeft: '10px',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',

  [mediaquery.tablet()]: {
    marginLeft: p.hasCoAUthors ? '10px' : '40px'
  }
}));

const Header = styled.header({
  position: 'relative',
  zIndex: 10,
  margin: '100px auto 120px',
  maxWidth: '549px',

  [mediaquery.desktop()]: {
    paddingLeft: '40px',
    paddingRight: '40px',
    maxWidth: 'calc(549px + 53px)',
    margin: '100px auto 70px'
  },

  [mediaquery.tablet()]: {
    paddingLeft: '30px',
    paddingRight: '30px',
    margin: '100px auto 70px',
    maxWidth: 'calc(540px)'
  },

  [mediaquery.phablet()]: {
    margin: '170px auto 180px',
    padding: '0 20px',
    maxWidth: '480px'
  },

  '@media screen and (max-height: 700px)': {
    margin: '100px auto'
  }
});

const HeroHeading = styled(Headings.h1)((p: ITAOAThemeUIContext) => ({
  fontSize: '48px',
  fontFamily: p.theme.fonts.serif,
  marginBottom: '25px',
  fontWeight: 'bold',
  lineHeight: 1.32,
  padding: '0',

  [mediaquery.tablet()]: {
    marginBottom: '20px',
    fontSize: '36px'
  },

  [mediaquery.phablet()]: {
    fontSize: '32px'
  }
}));

interface IHeroSubtitle extends ITAOAThemeUIContext {
  hasCoAUthors: boolean;
}

const HeroSubtitle = styled.div(
  (p: IHeroSubtitle) => `
     position: relative;
     display: flex;
     font-size: 18px;
     color: ${p.theme.colors.grey};

     ${mediaquery.tablet()} {
         flex-direction: column;
         font-size: 18px;

         ${
           p.hasCoAUthors &&
           `&::before {
        content: ' ';
        position: absolute;
        left: -5px;
        right: -10px;
        top: -10px;
        bottom: -10px;
        border: 1px solid ${p.theme.colors.horizontalRule};
        opacity: 0.5;
        border-radius: 5px;
           }`
         }

         strong {
           display: block;
           font-weight: 500;
           margin-bottom: 5px;
         }
     }

     ${mediaquery.phablet()} {
         font-size: 14px;
     }
   `
);

const HeroImage = styled.div({
  position: 'relative',
  zIndex: 1,
  overflow: 'hidden',
  margin: '0 auto',
  boxShadow: '0 30px 60px -10px rgba(0, 0, 0, 0.2), 0 18px 36px -18px rgba(0, 0, 0, 0.22)',
  width: '900px',

  [mediaquery.desktop()]: {
    width: 'calc(80vw + 20px)'
  },

  [mediaquery.phablet()]: {
    width: 'calc(100vw - 40px)',
    margin: '0 auto',
    height: '220px',

    '& > div': {
      height: '220px'
    }
  }
});
