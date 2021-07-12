/* eslint-disable */

const crypto = require(`crypto`);
const slugify = require('slugify');

// Create fields for post slugs and source
// This will change with schema customization with work
module.exports = ({ node, actions, getNode, createNodeId }) => {
  const { createNode, createNodeField, createParentChildLink } = actions;
  const postsPath = 'content/posts';
  const pagesPath = 'content/pages';
  const basePath = '/';
  const basePostsPath = '/posts';
  const postPermalinkFormat = ':slug';

  // Create source field (according to contentPath)
  const fileNode = getNode(node.parent);
  const source = fileNode && fileNode.sourceInstanceName;

  // ///////////////// Utility functions ///////////////////

  function generatePostPermalink(slug, date) {
    const d = new Date(date);
    const [year, month, day] = [d.getYear(), d.getMonth(), d.getDay()];

    const permalinkData = {
      year,
      month,
      day,
      slug
    };

    const permalink = postPermalinkFormat.replace(/(:[a-z_]+)/g, match => {
      const key = match.substr(1);
      if (permalinkData.hasOwnProperty(key)) {
        return permalinkData[key];
      }
      throw new Error(`
          We could not find the value for: "${key}".
        `);
    });

    return permalink;
  }

  function generateSlug(...arguments_) {
    return `/${arguments_.join('/')}`.replace(/\/\/+/g, '/');
  }

  // Nodes for authors ///////////////////////////////////////////////////////

  if (node.internal.type === `AuthorsYaml`) {
    const slug = node.slug ? `/${node.slug}` : slugify(node.name);

    const fieldData = {
      ...node,
      slug: generateSlug(basePath, 'authors', slug)
    };

    createNode({
      ...fieldData,
      // Required fields.
      id: createNodeId(`${node.id} >>> Author`),
      parent: node.id,
      children: [],
      internal: {
        type: `Author`,
        contentDigest: crypto.createHash(`md5`).update(JSON.stringify(fieldData)).digest(`hex`),
        content: JSON.stringify(fieldData),
        description: `Author`
      }
    });

    createParentChildLink({ parent: fileNode, child: node });

    return;
  }

  if (node.internal.type === `AboutYaml`) {
    const slug = node.slug ? `/${node.slug}` : slugify(node.name);

    const fieldData = {
      ...node,
      slug: generateSlug(basePath, 'about', slug)
    };

    createNode({
      ...fieldData,
      // Required fields.
      id: createNodeId(`${node.id} >>> about`),
      parent: node.id,
      children: [],
      internal: {
        type: `About`,
        contentDigest: crypto.createHash(`md5`).update(JSON.stringify(fieldData)).digest(`hex`),
        content: JSON.stringify(fieldData),
        description: `About`
      }
    });

    createParentChildLink({ parent: fileNode, child: node });

    return;
  }

  // Nodes for posts ///////////////////////////////////////////////////////

  if (node.internal.type === `Mdx` && source === postsPath) {
    const fieldData = {
      author: node.frontmatter.author,
      date: node.frontmatter.date,
      hero: node.frontmatter.hero,
      secret: node.frontmatter.secret || false,
      slug: generateSlug(
        basePostsPath,
        generatePostPermalink(slugify(node.frontmatter.title), node.frontmatter.date)
      ),
      title: node.frontmatter.title,
      subscription: node.frontmatter.subscription !== false,
      canonical_url: node.frontmatter.canonical_url
    };

    createNode({
      ...fieldData,
      // Required fields.
      id: createNodeId(`${node.id} >>> Post`),
      parent: node.id,
      children: [],
      internal: {
        type: `Post`,
        contentDigest: crypto.createHash(`md5`).update(JSON.stringify(fieldData)).digest(`hex`),
        content: JSON.stringify(fieldData),
        description: `Posts`
      }
    });

    createParentChildLink({ parent: fileNode, child: node });
  }
};
