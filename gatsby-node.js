const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: { fileAbsolutePath: { regex: "/(blog)/.*md$/" } }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
                dir
              }
              frontmatter {
                title
                draft
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const nextPost = index === 0 ? null : posts[index - 1].node
    const next = nextPost && nextPost.frontmatter.draft ? null : nextPost

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        dir: post.node.fields.dir,
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    if (!node.fileAbsolutePath.includes("content/home/")) {
      const value = createFilePath({ node, getNode })
      createNodeField({
        name: `dir`,
        node,
        value,
      })
    }
  }
}
