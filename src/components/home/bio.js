import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Bio = ({ content }) => {
  const { site } = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author
        }
      }
    }
  `)

  const { author } = site.siteMetadata
  return (
    <section>
      <header>
        <h1 style={{ marginTop: ".5em" }}>{author}</h1>
        <h2 style={{ marginTop: "-0.75em" }}>{content.frontmatter.title}</h2>
      </header>
      <p dangerouslySetInnerHTML={{ __html: content.html }} />
    </section>
  )
}

export default Bio
