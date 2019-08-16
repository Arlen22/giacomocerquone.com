import React from "react"

function Pubs({ content }) {
  return (
    <section>
      <header>
        <h2>{content.frontmatter.title}</h2>
      </header>
      <div dangerouslySetInnerHTML={{ __html: content.html }} />
    </section>
  )
}

export default Pubs
