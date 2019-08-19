import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import Bio from "../components/home/bio"
import Layout from "../components/home/layout"
import SEO from "../components/seo"

import Header from "../components/home/header/header"
import Pubs from "../components/home/pubs"
import LastPosts from "../components/home/lastPosts"

export default function SiteIndex({ location }) {
  const {
    allMarkdownRemark,
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    query SiteIndexQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
      allMarkdownRemark(
        limit: 5
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { frontmatter: { draft: { ne: true } } }
      ) {
        edges {
          node {
            fileAbsolutePath
            html
            frontmatter {
              title
              section
              slug
              description
            }
          }
        }
      }
    }
  `)
  const { edges } = allMarkdownRemark
  return (
    <Layout>
      <SEO
        title={siteMetadata.title}
        description={siteMetadata.description}
        location={location}
        noTemplate
      />
      <Header />
      <Bio
        content={
          edges.find(post => post.node.frontmatter.section === "bio").node
        }
      />
      <LastPosts
        edges={edges.filter(edge =>
          /(blog)\/.*md/.test(edge.node.fileAbsolutePath)
        )}
      />
      <Pubs
        content={
          edges.find(post => post.node.frontmatter.section === "pubs").node
        }
      />
    </Layout>
  )
}
