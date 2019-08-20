import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/blog/layout/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

export default function BlogPostTemplate({ pageContext, data, location }) {
  const post = data.markdownRemark
  const { siteMetadata } = data.site
  const { previous, next, dir } = pageContext
  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        image={post.frontmatter.image.childImageSharp.fixed.src}
        location={location}
      />
      <h1
        style={{
          marginTop: rhythm(1),
          marginBottom: 0,
        }}
      >
        {post.frontmatter.title}
      </h1>
      <p
        style={{
          ...scale(-1 / 5),
          display: `block`,
          marginBottom: rhythm(1),
        }}
      >
        {post.frontmatter.date}
      </p>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      <div style={{ marginBottom: "3em" }}>
        <a
          href={`https://mobile.twitter.com/search?q=${location &&
            location.href}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Discuss on Twitter
        </a>{" "}
        •{" "}
        <a
          href={`${siteMetadata.repoUrl + dir.slice(0, -1)}.md`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Edit on Github
        </a>
      </div>
      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />
      <ul
        style={{
          display: `flex`,
          flexWrap: `wrap`,
          justifyContent: `space-between`,
          listStyle: `none`,
          padding: 0,
        }}
      >
        <li>
          {previous && (
            <Link to={previous.fields.slug} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={next.fields.slug} rel="next">
              {next.frontmatter.title} →
            </Link>
          )}
        </li>
      </ul>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        repoUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        image {
          childImageSharp {
            fixed(width: 900) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`
