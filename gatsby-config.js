module.exports = {
  siteMetadata: {
    title: "Giacomo Cerquone",
    blogTitle: `A blog by Giacomo Cerquone`,
    author: `Giacomo Cerquone`,
    description: `Giacomo Cerquone, developer`,
    siteUrl: `https://giacomocerquone.com`,
    repoUrl:
      "https://github.com/giacomocerquone/giacomocerquone.com/tree/master/content/blog",
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/home`,
        name: `home`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-reading-time`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    "gatsby-plugin-slug",
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-66906230-1`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `A Blog by Giacomo Cerquone`,
        short_name: `gcerquone`,
        start_url: `/blog`,
        background_color: `#ffffff`,
        theme_color: `#124`,
        display: `fullscreen`,
        icon: `content/assets/logo.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
