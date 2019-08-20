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
              draft
              date(formatString: "MMMM DD, YYYY")
              title
              description
              imageAlt
              image {
                childImageSharp {
                  fixed(width: 900) {
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
        location={location}
      />
      {posts.map(({ node }) => {
        return (
          (!node.frontmatter.draft ||
            process.env.NODE_ENV === "development") && (
            <PostItem
              frontmatter={node.frontmatter}
              fields={node.fields}
              key={node.fields.slug}
            />
          )
        )
      })}
    </Layout>
  )
}
