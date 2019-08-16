import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import Layout from "../components/blog/layout/layout"
import SEO from "../components/seo"
import PostItem from "../components/blog/postItem/postItem"

export default function BlogIndex({ location }) {
  const {
    site: { siteMetadata },
    allMarkdownRemark,
  } = useStaticQuery(graphql`
    query BlogIndexQuery {
      site {
        siteMetadata {
          blogTitle
        }
      }
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { fileAbsolutePath: { regex: "/(blog)/.*md$/" } }
      ) {
        edges {
          node {
            excerpt
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
              description
              imageAlt
              image {
                childImageSharp {
                  fixed(width: 800) {
                    ...GatsbyImageSharpFixed
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  const posts = allMarkdownRemark.edges

  return (
    <Layout>
      <SEO title={siteMetadata.blogTitle} noTemplate />
      {posts.map(({ node }) => {
        return (
          <PostItem
            frontmatter={node.frontmatter}
            fields={node.fields}
            key={node.fields.slug}
          />
        )
      })}
    </Layout>
  )
}
