import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import Layout from "../components/home/layout"
import SEO from "../components/seo"

export default function NotFoundPage({ location }) {
  const {
    site: {
      siteMetadata: { description },
    },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          description
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO
        title="404: Not Found"
        description={description}
        location={location}
      />
      <h1>Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  )
}
