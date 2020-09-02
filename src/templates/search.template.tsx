import ArticlesList from '../sections/articles/Articles.List';

import Headings from '@components/Headings';
import Paginator from '@components/Navigation/Navigation.Paginator';
import SEO from '@components/SEO';
import Search from '@components/Search';
import Section from '@components/Section';
import mediaqueries, { mediaquery, mediaqueryup } from '@styles/media';
import { Template, TTemplate, IArticle, ITAOAThemeUIContext } from '@types';
import { motion, AnimatePresence } from 'framer-motion';

import { css } from '@emotion/core';
import { SerializedStyles } from '@emotion/serialize';
import styled from '@emotion/styled';
import * as CSS from 'csstype';
import { graphql, useStaticQuery } from 'gatsby';
import { Link } from 'gatsby';
import React, { useState } from 'react';

const siteQuery = graphql`
  {
    allSite {
      edges {
        node {
          siteMetadata {
            search {
              placeholder
              heading
              pageLength
            }
          }
        }
      }
    }
  }
`;

const SearchPage: Template = ({ location, pageContext }: TTemplate) => {
  const { articles } = pageContext;

  const results = useStaticQuery(siteQuery);
  const { search } = results.allSite.edges[0].node.siteMetadata;

  const [searchResults, setSearchResults] = useState(articles);
  const pages = Math.ceil([...searchResults].length / search.pageLength);

  const [currentPage, setCurrentPage] = useState(1);

  const filter = (e: IArticle, term: string): boolean => {
    return e.title.toLowerCase().includes(term) || e.title.includes(term);
  };

  const sort = (a: IArticle, b: IArticle): number => {
    if (a.dateForSEO > b.dateForSEO) {
      return -1;
    }
    if (a.dateForSEO < b.dateForSEO) {
      return 1;
    }
    return 0;
  };

  return (
    <span>
      <SEO pathname={location.pathname} />
      <Section narrow>
        <SearchContainer>
          <SearchHeading>{search.heading}</SearchHeading>
          <Search
            searchResults={searchResults}
            setSearchResults={setSearchResults}
            elements={articles}
            filter={filter}
            sort={sort}
            placeholder={search.placeholder}
          />
          <Horizontal />
          <ArticlesList
            articles={searchResults.slice(
              (currentPage - 1) * search.pageLength,
              currentPage * search.pageLength
            )}
            currentPage={currentPage}
          />
          <ArticlesPaginator show={pageContext.pageCount > 1}>
            <Paginator
              {...{
                index: 1,
                pageCount: pages,
                count: searchResults.slice(
                  (currentPage - 1) * search.pageLength,
                  currentPage * search.pageLength
                ).length,
                pathPrefix: '/bluh',
                setCurrentPage: setCurrentPage,
                currentPage: currentPage,
                ...pageContext
              }}
            />
          </ArticlesPaginator>
          <div>{pages}</div>
        </SearchContainer>
      </Section>
    </span>
  );
};

export default SearchPage;

const Horizontal = styled.div((p: ITAOAThemeUIContext) => ({
  position: 'relative',
  margin: '20px auto 50px',
  borderBottom: `2px solid ${p.theme.colors.horizontalNav}`,

  [mediaquery.tablet()]: {
    margin: '20px auto'
  }
}));

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
const ArticlesPaginator = styled.div((p: IArticlesPaginator) => ({
  ...(p.show && { marginTop: '95px' })
}));

const SearchContainer = styled.div((p: ITAOAThemeUIContext) => ({
  position: 'relative',
  bottom: 0,
  left: 0,
  zIndex: 1,
  width: '100%',
  padding: '200px 30px 0',
  transition: p.theme.colorModeTransition,

  [mediaquery.phablet()]: {
    padding: '150px 30px 0'
  }
}));

const SearchHeading = styled(Headings.h2)({
  [mediaquery.phablet()]: {
    padding: 0
  }
});
