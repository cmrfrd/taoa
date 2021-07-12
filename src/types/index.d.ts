import React from 'react';
import { Theme, ColorMode } from 'theme-ui';

export interface IStringMap {
  [key: string]: string | number | boolean;
}

export interface ITAOAFonts {
  [K: string]: string;
}

export interface ITAOAColorMode extends ColorMode {
  [key: string]: any;
}

export interface ITAOATheme extends Theme {
  colorModeTransition: string;
  fonts: ITAOAFonts;
  colors: ITAOAColorMode & {
    modes?: {
      [k: string]: ITAOAColorMode;
    };
  };
}

export interface ITAOAThemeUIContext {
  theme: ITAOATheme;
  colorMode?: string;
  setColorMode?: React.Dispatch<React.SetStateAction<string>>;
  stickyHeader?: boolean;
  active?: boolean;
  showArrow?: boolean;
}

export interface IPaginator {
  pageCount: number;
  index: number;
  pathPrefix: string;
}

interface IGatsbyImage {
  src: string;
  base64?: string;
  srcWebp?: string;
  srcSet?: string;
  srcSetWebp?: string;
  tracedSVG?: string;
}

interface IGatsbyImageFluid extends IGatsbyImage {
  maxHeight: number;
  maxWidth: number;
}

interface IGatsbyImageFixed extends IGatsbyImage {
  height: number;
  width: number;
}

export interface IAuthor {
  authorsPage?: boolean;
  featured?: boolean;
  name: string;
  slug: string;
  bio: string;
  email?: string;
  pgp_keyid?: string;
  avatar: {
    image: IGatsbyImageFluid;
    full: IGatsbyImageFluid;
    small: IGatsbyImageFluid;
    medium: IGatsbyImageFluid;
    large: IGatsbyImageFluid;
  };
}

export interface IAbout {
  name: string;
  about: {
    title: {
      author: string;
      authors: string;
      about: string[];
    };
    author: string;
    about: string[];
  };
}

export interface IPage {
  slug: string;
  body: string;
  id: string;
}

export interface IPost {
  id: string;
  slug: string;
  secret: boolean;
  title: string;
  authors: IAuthor[];
  excerpt: string;
  body: string;
  dateForSEO: string;
  hero: {
    full: IGatsbyImageFluid;
    preview: IGatsbyImageFluid;
    regular: IGatsbyImageFluid;
    narrow: IGatsbyImageFluid;
    seo: string;
  };
  timeToRead: number;
  date: string;
}

interface IPostQuery {
  edges: {
    node: IPost;
  }[];
}

export interface IProgress {
  height: number;
  offset: number;
  title: string;
  mode: string;
  onClose?: () => void;
}

export type Icon = {
  fill?: string;
};

export type TLayout = {
  gradient?: boolean;
  enableGridRow?: boolean;
  location: Location;
  pageName?: string;
  children: React.ReactNode;
};

export type TTemplate = {
  pageContext: {
    pageCount?: number;
    posts?: IPost[];

    homePageData?: any;
    aboutPageData?: any;
    searchPageData?: any;
    postPageData?: any;
    notFoundPageData?: any;

    post: IPost;
    authors: IAuthor[];
    next: IPost[];
    about: IAbout;
  };
  location: Location;
};
export type Template = React.FC<TTemplate>;
