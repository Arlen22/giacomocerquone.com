import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/home/layout"
import SEO from "../components/seo"

class NotFoundPage extends React.Component {
  render() {
    const { data } = this.props
    const { title, description } = data.site.siteMetadata

    return (
      <Layout location={this.props.location} title={title}>
        <SEO title="404: Not Found" description={description} />
        <h1>Not Found</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </Layout>
    )
  }
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        blogTitle
      }
    }
  }
`
