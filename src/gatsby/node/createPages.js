/* eslint-disable  */

require('dotenv').config();

const log = (message, section) =>
  console.log(`\n\u001B[36m${message} \u001B[4m${section}\u001B[0m\u001B[0m\n`);

const path = require('path');
const createPaginatedPages = require('gatsby-paginate');

const templatesDirectory = path.resolve(__dirname, '../../templates');
const templates = {
  home: path.resolve(templatesDirectory, 'home.template.tsx'),
  post: path.resolve(templatesDirectory, 'post.template.tsx'),
  author: path.resolve(templatesDirectory, 'author.template.tsx'),
  about: path.resolve(templatesDirectory, 'about.template.tsx'),
  search: path.resolve(templatesDirectory, 'search.template.tsx'),
  fourofour: path.resolve(templatesDirectory, '404.template.tsx')
};

const query = require('../data/data.query');
const normalize = require('../data/data.normalize');

// ///////////////// Utility functions ///////////////////

function buildPaginatedPath(index, basePath) {
  if (basePath === '/') {
    return index > 1 ? `${basePath}page/${index}` : basePath;
  }
  return index > 1 ? `${basePath}/page/${index}` : basePath;
}

function slugify(string, base) {
  const slug = string
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036F]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  return `${base}/${slug}`.replace(/\/\/+/g, '/');
}

function getUniqueListBy(array, key) {
  return [...new Map(array.map(item => [item[key], item])).values()];
}

const byDate = (a, b) => new Date(b.dateForSEO) - new Date(a.dateForSEO);

// ///////////////////////////////////////////////////////

module.exports = async ({ actions: { createPage }, graphql }, themeOptions) => {
  const { rootPath = '/', basePath = '/', sources = {} } = themeOptions;

  const dataSources = {
    local: { authors: [], posts: [] }
  };

  log('Config rootPath', rootPath);
  log('Config basePath', basePath);

  try {
    log('Querying all source data for pages:', 'Local');

    log('Mapping', 'Authors edges');
    const localAuthors = await graphql(query.local.authors);
    dataSources.local.authors = localAuthors.data.authors.edges.map(normalize.local.authors);

    log('Mapping', 'Posts edges');
    const localPosts = await graphql(query.local.posts);
    dataSources.local.posts = localPosts.data.posts.edges.map(normalize.local.posts);

    log('Mapping', 'Post edge');
    const localPost = await graphql(query.local.post);
    var postPageData = localPost.data.post;

    log('Mapping', 'Home edge');
    const localHome = await graphql(query.local.home);
    var homePageData = localHome.data.home;

    log('Mapping', 'About edge');
    const localAbout = await graphql(query.local.about);
    var aboutPageData = localAbout.data.about;

    log('Mapping', 'Search edge');
    const localSearch = await graphql(query.local.search);
    var searchPageData = localSearch.data.search;

    log('Mapping', 'notFound edge');
    const localNotFound = await graphql(query.local.notFound);
    var notFoundPageData = localNotFound.data.notFound;
  } catch (error) {
    console.error(error);
  }

  // Combining together all the posts from different sources
  posts = [...dataSources.local.posts].sort(byDate);
  log('Sorted posts', '');
  log(`${posts.length}`, 'total posts');

  const postsThatArentSecret = posts.filter(post => !post.secret);
  log('Filtered secret posts', '');
  log(`${postsThatArentSecret.length}`, 'total posts that are not secret');

  // Combining together all the authors from different sources
  authors = getUniqueListBy([...dataSources.local.authors], 'name');
  log(`${authors.length}`, 'author(s) found');

  if (posts.length === 0 || authors.length === 0) {
    throw new Error(`
    You must have at least one Author and Post.
  `);
  }

  /**
   * Once we've queried all our data sources and normalized them to the same structure
   * we can begin creating our pages. First, we'll want to create all main posts pages
   * that have pagination.
   */
  log('Creating', 'home page');
  createPage({
    path: basePath,
    component: templates.home,
    context: {
      basePath,
      homePageData: homePageData,
      posts: postsThatArentSecret,
      enableGridRow: true
    }
  });

  // Creating the about page
  log('Creating', 'about page');
  const aboutPath = '/about';
  createPage({
    path: aboutPath,
    component: templates.about,
    context: {
      aboutPageData: aboutPageData,
      authors: authors,
      basePath,
      slug: aboutPath,
      id: '123',
      enableGridRow: false
    }
  });

  log('Creating', 'search posts page');

  // Creating the about page
  const postsPath = '/posts';
  createPage({
    path: postsPath,
    component: templates.search,
    context: {
      authors,
      postsPath,
      searchPageData: searchPageData,
      posts: postsThatArentSecret,
      enableGridRow: true
    }
  });

  /**
   * Once the list of posts have bene created, we need to make individual post posts.
   * To do this, we need to find the corresponding authors since we allow for co-authors.
   */
  log('Creating', 'post posts');
  posts.forEach((post, index) => {
    // Match the Author to the one specified in the post
    let authorsThatWroteThePost;
    try {
        authorsThatWroteThePost = authors.filter(author => {
            const allAuthors = post.parent.frontmatter.author.map(a => a.trim().toLowerCase());
            return allAuthors.some(a => a === author.name.toLowerCase());
        });
    } catch (error) {
      throw new Error(`
        We could not find the Author for: "${post.title}".
        Double check the author field is specified in your post and the name
        matches a specified author.
        Provided author: ${post.author}
        ${error}
      `);
    }

    /**
     * We need a way to find the next artiles to suggest at the bottom of the posts page.
     * To accomplish this there is some special logic surrounding what to show next.
     */
    let next = postsThatArentSecret.slice(index + 1, index + 3);
    // If it's the last item in the list, there will be no posts. So grab the first 2
    if (next.length === 0) next = postsThatArentSecret.slice(0, 2);
    // If there's 1 item in the list, grab the first post
    if (next.length === 1 && postsThatArentSecret.length !== 2)
      next = [...next, postsThatArentSecret[0]];
    if (postsThatArentSecret.length === 1) next = [];

    createPage({
      path: post.slug,
      component: post.parent.fileAbsolutePath,
      context: {
        post,
        basePath,
        postPageData: postPageData,
        authors: authorsThatWroteThePost,
        slug: post.slug,
        id: post.id,
        title: post.title,
        canonicalUrl: post.canonical_url,
        enableGridRow: false,
        next
      }
    });
  });

  log('Creating', '404 page');

  // Creating the about page
  const path404 = '/404';
  createPage({
    path: path404,
    component: templates.fourofour,
    context: {
      basePath,
      notFoundPageData: notFoundPageData,
      slug: path404,
      id: '404',
      enableGridRow: true
    }
  });
};
