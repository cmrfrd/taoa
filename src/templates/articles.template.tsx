import ArticlesHero from '../sections/articles/Articles.Hero';
import ArticlesList from '../sections/articles/Articles.List';

import Layout from '@components/Layout';
import Paginator from '@components/Navigation/Navigation.Paginator';
import SEO from '@components/SEO';
import Section from '@components/Section';
import { Template, TTemplate, ITAOAThemeUIContext } from '@types';

import styled from '@emotion/styled';
import * as CSS from 'csstype';
import React from 'react';

const ArticlesPage: Template = ({ location, pageContext }: TTemplate) => {
  const { articles } = pageContext;

  return (
    <span>
      <SEO pathname={location.pathname} />
      <ArticlesHero />
      <Section narrow>
        <ArticlesList articles={articles} />
        <ArticlesPaginator show={pageContext.pageCount > 1}>
          <Paginator {...pageContext} />
        </ArticlesPaginator>
      </Section>
      <ArticlesGradient />
    </span>
  );
};

export default ArticlesPage;

const ArticlesGradient = styled.div((p: ITAOAThemeUIContext) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  height: '590px',
  zIndex: 0,
  pointerEvents: 'none',
  background: p.theme.colors.gradient as CSS.ColorProperty,
  transition: p.theme.colorModeTransition
}));

interface IArticlesPaginator extends ITAOAThemeUIContext {
  show: boolean;
}

const ArticlesPaginator = styled.div<{ show: boolean }>((p: IArticlesPaginator) => ({
  ...(p.show && { marginTop: '95px' })
}));
