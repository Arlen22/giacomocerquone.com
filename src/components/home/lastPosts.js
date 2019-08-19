import React from "react"
import { Link } from "gatsby"

import styles from "../blog/postItem/postItem.module.css"

function LastPosts({ edges }) {
  return (
    <section style={{ width: "80%" }}>
      <header>
        <h2>Last Posts</h2>
      </header>
      {edges.map(({ node }) => (
        <article key={node.frontmatter.slug}>
          <h4>
            <Link className={styles.postTitle} to={node.frontmatter.slug}>
              {node.frontmatter.title}
            </Link>
          </h4>
          <p style={{ fontSize: ".9em" }}>{node.frontmatter.description}</p>
        </article>
      ))}
      <footer>
        <Link to="/blog">See more...</Link>
      </footer>
    </section>
  )
}

export default LastPosts
