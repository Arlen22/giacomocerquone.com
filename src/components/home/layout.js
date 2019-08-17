import React from "react"

import { rhythm } from "../../utils/typography"

export default function HomeLayout({ children }) {
  return (
    <>
      <main
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(30),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        {children}
      </main>
      <footer
        style={{
          textAlign: "center",
          fontSize: ".8em",
          lineHeight: "1.2em",
          padding: "0rem 0 2rem 0",
        }}
      >
        Crafted with <span style={{ color: "#bb1a34" }}>❤</span> by me ©
        {new Date().getFullYear()}
      </footer>
    </>
  )
}
