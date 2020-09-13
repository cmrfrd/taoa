/* eslint-disable  */

require('dotenv').config();

const log = (message, section) =>
  console.log(`\n\u001B[36m${message} \u001B[4m${section}\u001B[0m\u001B[0m\n`);

const path = require('path');
const createPaginatedPages = require('gatsby-paginate');

const templatesDirectory = path.resolve(__dirname, '../../templates');
const templates = {
  home: path.resolve(templatesDirectory, 'home.template.tsx'),
  article: path.resolve(templatesDirectory, 'article.template.tsx'),
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
    local: { authors: [], articles: [] }
  };

  log('Config rootPath', rootPath);
  log('Config basePath', basePath);

  try {
    log('Querying all source data for pages:', 'Local');

    log('Mapping', 'Authors edges');
    const localAuthors = await graphql(query.local.authors);
    dataSources.local.authors = localAuthors.data.authors.edges.map(normalize.local.authors);

    log('Mapping', 'Articles edges');
    const localArticles = await graphql(query.local.articles);
    dataSources.local.articles = localArticles.data.articles.edges.map(normalize.local.articles);

    log('Mapping', 'Article edge');
    const localArticle = await graphql(query.local.article);
    var articlePageData = localArticle.data.article;

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

  // Combining together all the articles from different sources
  articles = [...dataSources.local.articles].sort(byDate);
  log('Sorted articles', '');
  log(`${articles.length}`, 'total articles');

  const articlesThatArentSecret = articles.filter(article => !article.secret);
  log('Filtered secret articles', '');
  log(`${articlesThatArentSecret.length}`, 'total articles that are not secret');

  // Combining together all the authors from different sources
  authors = getUniqueListBy([...dataSources.local.authors], 'name');
  log(`${authors.length}`, 'author(s) found');

  if (articles.length === 0 || authors.length === 0) {
    throw new Error(`
    You must have at least one Author and Post.
  `);
  }

  /**
   * Once we've queried all our data sources and normalized them to the same structure
   * we can begin creating our pages. First, we'll want to create all main articles pages
   * that have pagination.
   */
  log('Creating', 'home page');
  createPage({
    path: basePath,
    component: templates.home,
    context: {
      basePath,
      homePageData: homePageData,
      articles: articlesThatArentSecret,
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

  log('Creating', 'search page');

  // Creating the about page
  const articlesPath = '/articles';
  createPage({
    path: articlesPath,
    component: templates.search,
    context: {
      authors,
      articlesPath,
      searchPageData: searchPageData,
      articles: articlesThatArentSecret,
      enableGridRow: true
    }
  });

  /**
   * Once the list of articles have bene created, we need to make individual article posts.
   * To do this, we need to find the corresponding authors since we allow for co-authors.
   */
  log('Creating', 'article posts');
  articles.forEach((article, index) => {
    // Match the Author to the one specified in the article
    let authorsThatWroteTheArticle;
    try {
      authorsThatWroteTheArticle = authors.filter(author => {
        const allAuthors = article.author.split(',').map(a => a.trim().toLowerCase());
        return allAuthors.some(a => a === author.name.toLowerCase());
      });
    } catch (error) {
      throw new Error(`
        We could not find the Author for: "${article.title}".
        Double check the author field is specified in your post and the name
        matches a specified author.
        Provided author: ${article.author}
        ${error}
      `);
    }

    /**
     * We need a way to find the next artiles to suggest at the bottom of the articles page.
     * To accomplish this there is some special logic surrounding what to show next.
     */
    let next = articlesThatArentSecret.slice(index + 1, index + 3);
    // If it's the last item in the list, there will be no articles. So grab the first 2
    if (next.length === 0) next = articlesThatArentSecret.slice(0, 2);
    // If there's 1 item in the list, grab the first article
    if (next.length === 1 && articlesThatArentSecret.length !== 2)
      next = [...next, articlesThatArentSecret[0]];
    if (articlesThatArentSecret.length === 1) next = [];

    createPage({
      path: article.slug,
      component: templates.article,
      context: {
        article,
        basePath,
        articlePageData: articlePageData,
        authors: authorsThatWroteTheArticle,
        slug: article.slug,
        id: article.id,
        title: article.title,
        canonicalUrl: article.canonical_url,
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
