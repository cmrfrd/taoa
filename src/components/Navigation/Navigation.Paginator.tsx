import { mediaquery, mediaqueryup } from '@styles/media';
import { IPaginator, ITAOAThemeUIContext } from '@types';
import { range } from '@utils';

import { css } from '@emotion/core';
import { SerializedStyles } from '@emotion/serialize';
import styled from '@emotion/styled';
import * as CSS from 'csstype';
import { Link } from 'gatsby';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

interface IPaginatorProps {
  maxPages: number;
  count: number;
}

const Pagin: React.FC<{}> = ({ children }) => {};

/**
 * <Paginator />
 *
 * 1 2 3 ... final page NEXT
 * Component to navigate between different pages on a series of blog post, for example.
 *
 * We're using a <nav> element here so make sure to put the pagination component
 * INSIDE of a section to make sure the markup stays contextually relevant
 *
 * Receives the gatsby-paginator props
 */

class Paginator extends Component<IPaginator, {}> {
  maxPages: number = 3;
  count: number = this.props.pageCount;
  pageRoot: string = this.props.pathPrefix;

  /**
   * Utility function to return a 1 ... 5 6 7 ... 10 style pagination
   */
  get getPageLinks(): React.ReactNode {
    const current = this.props.currentPage;
    const count = this.props.pageCount;
    const maxPages = this.maxPages;

    // Current is the page we're on
    // We want to show current - 1, current, current + 1
    // Of course if we're on page 1, we don't want a page 0
    const previousPage = current === 0 ? current : current - 1;

    // Now create a range of numbers from the previousPage to the total pages (count)
    const pagesRange = range(previousPage, count);

    // We might need to truncate that pagesRange if it's
    // more than the max pages we wish to display (3)
    const truncatedRange: Array<number | null> = pagesRange.slice(0, maxPages);

    // Throughout this function we might add a null to our pages range.
    // When it comes to rendering our range if we find a null we'll add a spacer.

    // We might need a spacer at the start of the pagination e.g. 1 ... 3 4 5 etc.
    // If we're after the second page, we need a ... spacer (3 and up)
    if (pagesRange[0] > 1) {
      truncatedRange.unshift(null);
    }
    // If we're after the first page, we need page 1 to appear (2 and up)
    if (pagesRange[0] > 0) {
      truncatedRange.unshift(0);
    }

    // If we're on the final page, then there won't be a "next" page and
    // the pagination will end up looking a bit short (e.g. on 8 pages ... 7, 8)
    // Push to the end an extra page maxPages from the end
    if (pagesRange[0] + 1 === count && pagesRange[0] - 1 > 0) {
      truncatedRange.splice(pagesRange.length - 1 - maxPages, 0, pagesRange[0] - 1);
    }

    // We might need a spacer at the end of the pagination e.g. 4 5 6 ... 8
    // If we're before the penultimate page, we need a ... spacer
    if (pagesRange[0] + maxPages < count) {
      truncatedRange.push(null);
    }

    // If we're before the last page, we need page <last> to appear
    if (pagesRange[0] + maxPages - 1 < count) {
      truncatedRange.push(count);
    }

    return [...new Set(truncatedRange)].map((page: number | null, i: number) =>
      page === null ? (
        // If you find a null in the truncated array then add a spacer
        <Spacer key={`PaginatorPage_spacer_${i}`} aria-hidden={true} />
      ) : (
        // Otherwise render a PageButton
        <PageNumberBUtton
          key={`PaginatorPage_${page}`}
          style={{ opacity: current === page ? 1 : 0.3 }}
          className="Paginator__pageLink"
          onClick={() => {
            this.props.setCurrentPage(page);
            window.scroll({ top: 0, left: 0, behavior: 'smooth' });
          }}
        >
          {page}
        </PageNumberBUtton>
      )
    );
  }

  render(): React.ReactNode {
    const count = this.count;

    if (count <= 1) return null;

    const previousPath = this.previousPath;
    const nextPath = this.nextPath;
    const hasNext = this.props.currentPage < this.count;
    const hasPrevious = this.props.currentPage > 1;

    const mod = (a, b) => ((a % b) + b) % b;

    return (
      <>
        <Helmet>
          {hasPrevious && <link rel="prev" href={previousPath} />}
          {hasNext && <link rel="next" href={nextPath} />}
        </Helmet>
        <Frame>
          {this.props.pageCount > 0 && (
            <PageButton
              onClick={() => {
                this.props.setCurrentPage(mod(this.props.currentPage - 1, this.props.pageCount));
                window.scroll({ top: 0, left: 0, behavior: 'smooth' });
              }}
            >
              Prev
            </PageButton>
          )}
          {this.getPageLinks}
          {this.props.pageCount > 0 && (
            <PageButton
              onClick={() => {
                this.props.setCurrentPage(mod(this.props.currentPage + 1, this.props.pageCount));
                window.scroll({ top: 0, left: 0, behavior: 'smooth' });
              }}
            >
              Next
            </PageButton>
          )}
        </Frame>
      </>
    );
  }
}

export default Paginator;

const paginationItemMixin = (p: ITAOAThemeUIContext): SerializedStyles => css`
  line-height: 1;
  color: ${p.theme.colors.primary};
  padding: 2rem;
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
  }
`;

const PageButton = styled.div`
  font-weight: 600;
  font-size: 18px;
  text-decoration: none;
  ${(p: ITAOAThemeUIContext): SerializedStyles => paginationItemMixin(p)}

  &:hover,
    &:focus {
    opacity: 1;
    text-decoration: underline;
  }
`;

const PageNumberBUtton = styled.div`
  font-weight: 400;
  font-size: 18px;
  text-decoration: none;
  color: ${(p: ITAOAThemeUIContext): CSS.ColorProperty => p.theme.colors.primary};
  ${(p: ITAOAThemeUIContext): SerializedStyles => paginationItemMixin(p)}

  &:hover,
    &:focus {
    opacity: 1;
    text-decoration: underline;
  }
`;

const Spacer = styled.span`
  opacity: 0.3;
  ${(p: ITAOAThemeUIContext): SerializedStyles => paginationItemMixin(p)}
  &::before {
    content: '...';
  }
`;

const MobileReference = styled.span`
    font-weight: 400;
    ${(p: ITAOAThemeUIContext): SerializedStyles => paginationItemMixin(p)}
    color: ${(p: ITAOAThemeUIContext): CSS.ColorProperty => p.theme.colors.primary};

    em {
    font-style: normal;
    color: ${(p: ITAOAThemeUIContext): CSS.ColorProperty => p.theme.colors.primary};
    }
`;

const Frame = styled.div`
  position: relative;
  z-index: 1;
  display: inline-flex;

  ${mediaquery.tablet()} {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ${mediaqueryup.desktop()} {
    justify-content: space-between;
    align-items: center;
    justify-content: flex-start;
  }
`;
