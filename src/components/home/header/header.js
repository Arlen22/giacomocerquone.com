import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faLinkedinIn,
  faGithub,
  faStackOverflow,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons"

import styles from "./header.module.css"

export default function Header() {
  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    query HomeHeaderQuery {
      site {
        siteMetadata {
          author
        }
      }
    }
  `)

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <img
        style={{ borderRadius: ".5em", alignSelf: "center" }}
        src="https://www.gravatar.com/avatar/a244447940601d3cf55d27c7278ce446?s=200"
        alt={siteMetadata.author}
      />
      <nav style={{ margin: ".8em 0" }}>
        <Link to="/blog">Blog</Link>
      </nav>
      <ul className={styles.socialLinks}>
        <li>
          <a
            className={styles.in}
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/giacomocerquone"
          >
            <FontAwesomeIcon size="lg" icon={faLinkedinIn} />
          </a>
        </li>
        <li>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/giacomocerquone/"
            className={styles.gh}
          >
            <FontAwesomeIcon size="lg" icon={faGithub} />
          </a>
        </li>
        <li>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://stackoverflow.com/users/2809729/giacomo-cerquone"
            className={styles.so}
          >
            <FontAwesomeIcon size="lg" icon={faStackOverflow} />
          </a>
        </li>
        <li>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://facebook.com/giacomocerquone"
            className={styles.fb}
          >
            <FontAwesomeIcon size="lg" icon={faFacebook} />
          </a>
        </li>
      </ul>
    </header>
  )
}
