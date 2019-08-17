import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import Bio from "../components/home/bio"
import Layout from "../components/home/layout"
import SEO from "../components/seo"

import Header from "../components/home/header/header"
import Pubs from "../components/home/pubs"

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
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { fileAbsolutePath: { regex: "/(home)/.*md$/" } }
      ) {
        edges {
          node {
            html
            frontmatter {
              title
              section
            }
          }
        }
      }
    }
  `)
  const { edges: sections } = allMarkdownRemark

  return (
    <Layout>
      <SEO
        title={siteMetadata.title}
        description={siteMetadata.description}
        noTemplate
      />
      <Header />
      <Bio
        content={
          sections.find(post => post.node.frontmatter.section === "bio").node
        }
      />
      <Pubs
        content={
          sections.find(post => post.node.frontmatter.section === "pubs").node
        }
      />
    </Layout>
  )
}
