import Hero from '../sections/posts/Hero';
import PostsList from '../sections/posts/Posts.List';
import { GridLayoutContext } from '../sections/posts/Posts.List.Context';

import { MediumButton } from '@components/Button';
import Headings from '@components/Headings';
import Email from '@components/Email';
import LoadingContainer from '@components/Loading';
import SEO from '@components/SEO';
import Section from '@components/Section';
import Search from '@components/Search';
import Paginator from '@components/Navigation/Navigation.Paginator';
import { mediaquery, mediaqueryup } from '@styles/media';
import { Template, TTemplate, ITAOAThemeUIContext } from '@types';

import { css } from '@emotion/react';
import { SerializedStyles } from '@emotion/serialize';
import styled from '@emotion/styled';
import React, { useState, useContext } from 'react';

import { ThemeProvider } from 'theme-ui';
import { theme } from '@utils';

const HomePage: Template = ({ location, pageContext }: TTemplate) => {
  const { posts } = pageContext;
  const { search } = pageContext.searchPageData.edges[0].node;

  const [searchResults, setSearchResults] = useState(posts);
  const pages = Math.ceil([...searchResults].length / search.pageLength);

  const [currentPage, setCurrentPage] = useState(0);

  const [searching, setSearching] = useState(true);

  const [numSearchResults, setNumSearchResults] = useState(posts.length);

  const { gridLayout } = useContext(GridLayoutContext);

  return (
    <LoadingContainer>
      <SEO pathname={location.pathname} />
      <Hero />
      <Section narrow>
        <Horizontal />
        <SubscribeHeading>{'Subscribe to The Art of Abstraction'}</SubscribeHeading>
        <Email />
        <SearchContainer gridLayout={gridLayout}>
          <VSpacer />
          <SearchHeading>{search.heading}</SearchHeading>
          <Search
            setNumSearchResults={setNumSearchResults}
            searchResults={searchResults}
            setSearchResults={setSearchResults}
            setCurrentPage={setCurrentPage}
            searching={searching}
            setSearching={setSearching}
            elements={posts}
            placeholder={search.placeholder}
          />
          <NumPostsHeader>{numSearchResults} results found</NumPostsHeader>
          <PostsList
            posts={searchResults.slice(
              currentPage * search.pageLength,
              (currentPage + 1) * search.pageLength
            )}
            currentPage={currentPage}
            searching={searching}
          />
        </SearchContainer>
        <PostsPaginator show={pageContext.pageCount > 1}>
          <Paginator
            {...{
              pageCount: pages,
              count: searchResults.slice(
                (currentPage - 1) * search.pageLength,
                currentPage * search.pageLength
              ).length,
              pathPrefix: '/',
              setCurrentPage: setCurrentPage,
              currentPage: currentPage,
              ...pageContext
            }}
          />
        </PostsPaginator>
      </Section>
    </LoadingContainer>
  );
};

export default HomePage;

const VSpacer = styled.div({
  height: '10px'
});

const Container = styled.div((p: ITAOAThemeUIContext) => ({
  position: 'relative',
  bottom: 0,
  left: 0,
  zIndex: 1,
  width: '100%',
  transition: p.theme.colorModeTransition
}));

const PostsHeading = styled(Headings.h2)((p: ITAOAThemeUIContext) => ({
  fontStyle: 'normal',
  fontSize: '30px',
  lineHeight: '1.15',
  color: `${p.theme.colors.primary}`,
  paddingBottom: '20px',

  a: {
    color: `${p.theme.colors.accent}`
  },

  [mediaquery.desktop()]: {
    fontSize: '26px'
  },

  [mediaquery.phablet()]: {
    fontSize: '22px',
    padding: '0 10px 10px'
  }
}));

const paginationItemMixin = (p: ITAOAThemeUIContext): SerializedStyles => css`
  line-height: 1;
  color: ${p.theme.colors.primary};
  padding: 0;
  width: 6.8rem;
  height: 6.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-variant-numeric: tabular-nums;

  ${mediaqueryup.desktop()} {
    display: block;
    width: auto;
    height: auto;
    padding: 2rem;

    &:first-of-type {
      padding-left: 0;
    }

    &:last-child {
      padding-right: 0;
    }
  }
`;

const LinkContainer = styled.div({
  marginTop: '100px',
  display: 'flex',
  flexDirection: 'row',
  [mediaquery.phablet()]: {
    position: 'relative',
    display: 'block',
    textAlign: 'center'
  }
});

///////////////////////////////

interface ISearchContainerProps extends ITAOAThemeUIContext {
  gridLayout: string;
}

const SearchContainer = styled.div((p: ISearchContainerProps) => ({
  position: 'relative',
  bottom: 0,
  left: 0,
  zIndex: 1,
  width: '100%',
  padding: '50px 0px 0px',
  transition: p.theme.colorModeTransition,
  minHeight: p.gridLayout ? '1600px' : '1000px',

  [mediaquery.phablet()]: {
    padding: '20px 30px 0'
  }
}));

const SearchHeading = styled(Headings.h2)({
  [mediaquery.phablet()]: {
    padding: 0
  }
});

const SubscribeHeading = styled(Headings.h4)({
  [mediaquery.phablet()]: {
    padding: 0
  }
});

const NumPostsHeader = styled(Headings.h5)({
  [mediaquery.phablet()]: {
    padding: 0
  }
});

interface IPostsPaginator extends ITAOAThemeUIContext {
  show: boolean;
}
const PostsPaginator = styled.div((p: IPostsPaginator) => ({
  ...(p.show && { marginTop: '95px' }),
  width: '100%'
}));

const Horizontal = styled.div((p: ITAOAThemeUIContext) => ({
  position: 'relative',
  margin: '90px auto 50px',
  borderBottom: `1px solid ${p.theme.colors.horizontalRule}`,

  [mediaquery.tablet()]: {
    margin: '60px auto'
  },

  [mediaquery.phone()]: {
    display: 'none'
  }
}));
