import React from "react"
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"

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
        image={
          post.frontmatter.image &&
          post.frontmatter.image.childImageSharp.fixed.src
        }
        location={location}
      />
      <header
        style={{ textAlign: "center", maxWidth: rhythm(30), margin: "auto" }}
      >
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
          {post.fields.readingTime.text}
          <br />
          <time>{post.frontmatter.date}</time>
        </p>
      </header>
      <div
        style={{
          margin: "2rem auto 4rem auto",
          maxWidth: rhythm(40),
          textAlign: "center",
        }}
      >
        <Image
          fluid={post.frontmatter.image.childImageSharp.fluid}
          alt={post.frontmatter.imageAlt}
          style={{
            maxHeight: "21rem",
          }}
        />
        <p style={{ marginTop: "1rem" }}>
          Photo by{" "}
          <a
            href={`https://unsplash.com/@${post.frontmatter.imgAuthor}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {post.frontmatter.imgAuthor}
          </a>
        </p>
      </div>

      <div
        style={{ maxWidth: rhythm(30), margin: "auto" }}
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
      <div style={{ maxWidth: rhythm(30), margin: "auto" }}>
        <div style={{ marginBottom: "3em" }}>
          <a
            href={`https://mobile.twitter.com/search?q=${siteMetadata.siteUrl}/${post.frontmatter.slug}`}
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
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        repoUrl
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      fields {
        readingTime {
          text
        }
      }
      excerpt(pruneLength: 160)
      html
      frontmatter {
        imgAuthor
        imageAlt
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_tracedSVG
            }
            fixed(width: 450) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        slug
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
