import React from "react"
import { Link } from "gatsby"
import Image from "gatsby-image"

import { rhythm } from "../../../utils/typography"
import styles from "./postItem.module.css"

function PostItem({ fields, frontmatter }) {
  const title = frontmatter.title || fields.slug
  return (
    <article className={styles.post}>
      {frontmatter.image && (
        <Image
          fluid={frontmatter.image.childImageSharp.fluid}
          alt={frontmatter.imageAlt}
          className={styles.postThumb}
        />
      )}
      <div className={styles.content}>
        <header>
          <small>{frontmatter.date}</small>
          <h2
            style={{
              marginTop: rhythm(1 / 4),
            }}
          >
            <Link to={fields.slug} className={styles.postTitle}>
              {title}
            </Link>
          </h2>
        </header>
        <p style={{ marginBottom: 0 }}>{frontmatter.description}</p>
      </div>
    </article>
  )
}

export default PostItem
