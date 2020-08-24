import ArticleAuthors from './Article.Authors';

import Headings from '@components/Headings';
import Image, { ImagePlaceholder } from '@components/Image';
import { mediaquery } from '@styles/media';
import { IArticle, IAuthor, ITAOAThemeUIContext } from '@types';

import styled from '@emotion/styled';
import React from 'react';

interface IArticleHeroProps {
  article: IArticle;
  authors: IAuthor[];
}

const ArticleHero: React.FC<IArticleHeroProps> = ({ article, authors }: IArticleHeroProps) => {
  const hasCoAUthors = authors.length > 1;
  const hasHeroImage =
    article.hero &&
    Object.keys(article.hero.full).length !== 0 &&
    article.hero.full.constructor === Object;

  return (
    <Hero>
      <Header>
        <HeroHeading>{article.title}</HeroHeading>
        <HeroSubtitle hasCoAUthors={hasCoAUthors}>
          <ArticleAuthors authors={authors} />
          <ArticleMeta hasCoAUthors={hasCoAUthors}>
            {article.date} · {article.timeToRead} min read
          </ArticleMeta>
        </HeroSubtitle>
      </Header>
      <HeroImage id="ArticleImage__Hero">
        {hasHeroImage ? <Image src={article.hero.full} /> : <ImagePlaceholder />}
      </HeroImage>
    </Hero>
  );
};

export default ArticleHero;

const Hero = styled.div(
  (p: ITAOAThemeUIContext) => `
  padding-top: 8rem;
  ${mediaquery.phablet()} {
            &::before {
                content: '""';
                width: 100%;
                height: 20px;
                background: ${p.theme.colors.primary};
                position: absolute;
                left: 0;
                top: 0;
                transition: ${p.theme.colorModeTransition};
            }

            &::after {
                content: '""';
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

interface IArticleMeta extends ITAOAThemeUIContext {
  hasCoAUthors: boolean;
}
const ArticleMeta = styled.div((p: IArticleMeta) => ({
  marginLeft: p.hasCoAUthors ? '10px' : '0',

  [mediaquery.phablet()]: {
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
    paddingLeft: '20px',
    paddingRight: '20px',
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

     ${mediaquery.phablet()} {
         font-size: 14px;
         flex-direction: column;

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
