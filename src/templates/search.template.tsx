import ArticlesList from '../sections/articles/Articles.List';

import Headings from '@components/Headings';
import Layout from '@components/Layout';
import Paginator from '@components/Navigation/Navigation.Paginator';
import SEO from '@components/SEO';
import Search from '@components/Search';
import Section from '@components/Section';
import mediaqueries from '@styles/media';
import { Template } from '@types';

import styled from '@emotion/styled';
import { graphql, useStaticQuery } from 'gatsby';
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
            }
          }
        }
      }
    }
  }
`;

const SearchPage: Template = ({ location, pageContext }) => {
  const articles = pageContext.group;

  const results = useStaticQuery(siteQuery);
  const { search } = results.allSite.edges[0].node.siteMetadata;

  const [searchResults, setSearchResults] = useState(articles);

  const filter = (e, term) => {
    return e.title.toLowerCase().includes(term) || e.title.includes(term);
  };
  const sort = (a, b) => {
    if (a.dateForSEO > b.dateForSEO) {
      return -1;
    }
    if (a.dateForSEO < b.dateForSEO) {
      return 1;
    }
    return 0;
  };

  return (
    <Layout location={location} enableGridRow={true}>
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
          <ArticlesList articles={searchResults} />
          <ArticlesPaginator show={pageContext.pageCount > 1}>
            <Paginator {...pageContext} />
          </ArticlesPaginator>
        </SearchContainer>
      </Section>
      <ArticlesGradient />
    </Layout>
  );
};

export default SearchPage;

const Horizontal = styled.div`
  position: relative;
  margin: 20px auto 50px;
  border-bottom: 2px solid ${p => p.theme.colors.horizontalNav};

  ${mediaqueries.tablet`
margin: 20px auto;
`}
`;

const ArticlesGradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 590px;
  z-index: 0;
  pointer-events: none;
  background: ${p => p.theme.colors.gradient};
  transition: ${p => p.theme.colorModeTransition};
`;

const ArticlesPaginator = styled.div<{ show: boolean }>`
  ${p => p.show && `margin-top: 95px;`}
`;

const SearchContainer = styled.div`
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 200px 30px 0;
  background: ${p => p.theme.colors.background};
  transition: ${p => p.theme.colorModeTransition};

  ${mediaqueries.phablet`
padding: 150px 30px 0;
`}
`;

const SearchHeading = styled(Headings.h2)`
  ${mediaqueries.phablet`
padding: 0;
`}
`;
