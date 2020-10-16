import ArticleHero from '../sections/article/Article.Hero';
import ArticlesNext from '../sections/article/Article.Next';
import ArticleSEO from '../sections/article/Article.SEO';
import ArticleShare from '../sections/article/Article.Share';

import MDX from '@components/MDX';
import Section from '@components/Section';
import { mediaquery } from '@styles/media';
import { Template, TTemplate, ITAOAThemeUIContext } from '@types';

import styled from '@emotion/styled';
import { graphql, useStaticQuery } from 'gatsby';
import React, { useRef } from 'react';

const articleQuery = graphql`
  {
    site {
      siteMetadata {
        siteName
      }
    }
  }
`;

/**
 * Article page layout. Every article's content comes from MDX
 * and suggests next articles, comments, and how to email subscribe
 */
const Article: Template = ({ pageContext, location }: TTemplate) => {
  const contentSectionRef = useRef<HTMLElement>(null);

  const { article, authors, next, articlePageData } = pageContext;
  const { nextArticleText } = articlePageData.edges[0].node.article;
  const { siteName } = useStaticQuery(articleQuery).site.siteMetadata;

  return (
    <span>
      <ArticleSEO article={article} authors={authors} location={location} />
      <ArticleHero article={article} authors={authors} />
      <ArticleBody ref={contentSectionRef}>
        <MDX content={article.body}>
          <ArticleShare />
        </MDX>
      </ArticleBody>
      {next.length > 0 && (
        <NextArticle narrow>
          <FooterNext>
            {nextArticleText} {siteName}
          </FooterNext>
          <ArticlesNext articles={next} />
          <FooterSpacer />
        </NextArticle>
      )}
    </span>
  );
};

export default Article;

const ArticleBody = styled.article({
  position: 'relative',
  padding: '160px 0 35px',
  transition: 'background 0.2s linear',

  [mediaquery.desktop()]: {
    padding: '160px 0 35px'
  },

  [mediaquery.tablet()]: {
    padding: '160px 10px 80px'
  },

  [mediaquery.phablet()]: {
    padding: '160px 0'
  }
});

const NextArticle = styled(Section)({
  display: 'block'
});

const FooterNext = styled.h3((p: ITAOAThemeUIContext) => ({
  position: 'relative',
  opacity: 0.25,
  marginBottom: '100px',
  fontWeight: 400,
  color: `${p.theme.colors.primary}`,

  [mediaquery.tablet()]: {
    marginBottom: '60px'
  },

  [mediaquery.phone()]: {
    textAlign: 'center'
  },

  '&::after': {
    content: '""',
    position: 'absolute',
    background: `${p.theme.colors.grey}`,
    width: `calc(100% - 290px)`,
    height: '1.25px',
    right: 0,
    top: '11px',

    [mediaquery.tablet()]: {
      height: '1px',
      width: `${(600 / 1140) * 80}%`
    },

    [mediaquery.phablet()]: {
      width: `calc(100% - 290px)`
    },

    [mediaquery.phone()]: {
      width: `${0}%`
    }
  }
}));

const FooterSpacer = styled.div({
  marginBottom: '65px'
});
