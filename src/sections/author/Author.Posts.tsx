import React from 'react';
import styled from '@emotion/styled';

import mediaqueries from '@styles/media';
import { IPost } from '@types';

import PostsList from '../posts/Posts.List';

interface AuthorPostsProps {
  posts: IPost[];
}

const AuthorPosts: React.FC<AuthorPostsProps> = ({ posts }) => {
  return (
    <AuthorPostsContainer>
      <PostsList posts={posts} alwaysShowAllDetails />
    </AuthorPostsContainer>
  );
};

export default AuthorPosts;

const AuthorPostsContainer = styled.div`
  background: linear-gradient(
    180deg,
    ${p => p.theme.colors.card} 0%,
    rgba(249, 250, 252, 0) 91.01%
  );
  border-radius: 8px;
  padding: 88px 98px;
  position: relative;
  z-index: 1;

  ${mediaqueries.desktop_medium`
    padding: 80px;
  `}

  ${mediaqueries.desktop`
    padding: 0;
    background: transparent;
  `}
`;
