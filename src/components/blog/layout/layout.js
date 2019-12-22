import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUp } from "@fortawesome/fontawesome-free-solid"

import { rhythm } from "../../../utils/typography"
import Header from "../header/header"

import styles from "./layout.module.css"

export default function BlogLayout({ children, maxWidth }) {
  return (
    <>
      <Header />
      <main
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth,
          padding: `0 ${rhythm(3 / 4)}`,
        }}
      >
        {children}
      </main>
      <footer
        style={{ textAlign: "center", fontSize: ".8em", lineHeight: "1.2em" }}
      >
        <button
          className={styles.icon}
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <FontAwesomeIcon size="lg" icon={faArrowUp} title="arrow up" />
        </button>
        <p className={styles.credits}>
          Crafted with <span style={{ color: "#bb1a34" }}>❤</span> by me
          <br />©{new Date().getFullYear()}
        </p>
      </footer>
    </>
  )
}
