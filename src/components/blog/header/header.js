import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { rhythm } from "../../../utils/typography"
import styles from "./header.module.css"

export default function Header() {
  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    query BlogHeaderQuery {
      site {
        siteMetadata {
          author
          title
        }
      }
    }
  `)

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(30),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          style={{ borderRadius: ".5em", alignSelf: "center", margin: 0 }}
          src="https://www.gravatar.com/avatar/a244447940601d3cf55d27c7278ce446?s=60"
          alt={siteMetadata.author}
        />
        <h4 style={{ margin: "0 .5em", color: "#333" }}>
          <Link to="/" className={styles.title}>
            {siteMetadata.title}
          </Link>
        </h4>
      </div>

      <nav>
        <Link to="/blog">Blog</Link>
      </nav>
    </header>
  )
}
