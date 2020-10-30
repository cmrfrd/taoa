import PostsList from '../sections/posts/Posts.List';
import { GridLayoutContext } from '../sections/posts/Posts.List.Context';

import Headings from '@components/Headings';
import Paginator from '@components/Navigation/Navigation.Paginator';
import SEO from '@components/SEO';
import Search from '@components/Search';
import Section from '@components/Section';
import { mediaquery } from '@styles/media';
import { Template, TTemplate, IPost, ITAOAThemeUIContext } from '@types';

import styled from '@emotion/styled';
import React, { useState, useContext } from 'react';

const SearchPage: Template = ({ location, pageContext }: TTemplate) => {
  const { posts } = pageContext;
  const { search } = pageContext.searchPageData.edges[0].node;

  const [searchResults, setSearchResults] = useState(posts);
  const pages = Math.ceil([...searchResults].length / search.pageLength);

  const [currentPage, setCurrentPage] = useState(0);

  const [searching, setSearching] = useState(true);

  const [numSearchResults, setNumSearchResults] = useState(posts.length);

  const { gridLayout } = useContext(GridLayoutContext);

  const filter = (e: IPost, term: string): boolean => {
    return e.title.toLowerCase().includes(term) || e.title.includes(term);
  };

  const sort = (a: IPost, b: IPost): number => {
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
        <SearchContainer gridLayout={gridLayout}>
          <SearchHeading>{search.heading}</SearchHeading>
          <Search
            setNumSearchResults={setNumSearchResults}
            searchResults={searchResults}
            setSearchResults={setSearchResults}
            setCurrentPage={setCurrentPage}
            searching={searching}
            setSearching={setSearching}
            elements={posts}
            filter={filter}
            sort={sort}
            placeholder={search.placeholder}
          />
          <Horizontal />
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
              pathPrefix: '/bluh',
              setCurrentPage: setCurrentPage,
              currentPage: currentPage,
              ...pageContext
            }}
          />
        </PostsPaginator>
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

interface IPostsPaginator extends ITAOAThemeUIContext {
  show: boolean;
}
const PostsPaginator = styled.div((p: IPostsPaginator) => ({
  ...(p.show && { marginTop: '95px' }),
  width: '100%'
}));

interface ISearchContainerProps extends ITAOAThemeUIContext {
  gridLayout: string;
}

const SearchContainer = styled.div((p: ISearchContainerProps) => ({
  position: 'relative',
  bottom: 0,
  left: 0,
  zIndex: 1,
  width: '100%',
  padding: '200px 30px 50px',
  transition: p.theme.colorModeTransition,
  minHeight: p.gridLayout ? '1600px' : '1000px',

  [mediaquery.phablet()]: {
    padding: '150px 30px 0'
  }
}));

const SearchHeading = styled(Headings.h2)({
  [mediaquery.phablet()]: {
    padding: 0
  }
});

const NumPostsHeader = styled(Headings.h5)({
  [mediaquery.phablet()]: {
    padding: 0
  }
});
