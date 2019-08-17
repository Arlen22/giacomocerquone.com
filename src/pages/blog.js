import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import Layout from "../components/blog/layout/layout"
import SEO from "../components/seo"
import PostItem from "../components/blog/postItem/postItem"

export default function BlogIndex() {
  const {
    site: { siteMetadata },
    allMarkdownRemark,
  } = useStaticQuery(graphql`
    query BlogIndexQuery {
      site {
        siteMetadata {
          blogTitle
          description
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
                  fixed(width: 450) {
                    ...GatsbyImageSharpFixed_tracedSVG
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
      <SEO
        title={siteMetadata.blogTitle}
        noTemplate
        description={siteMetadata.description}
      />
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
