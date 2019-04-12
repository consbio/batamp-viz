const config = require('./config/meta')

module.exports = {
  siteMetadata: {
    siteUrl: config.siteUrl,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        displayName: process.env.NODE_ENV !== `production`,
        fileName: false,
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `./config/typography.js`,
      },
    },
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: config.googleAnalyticsId,
        anonymize: true,
      },
    },
    {
      resolve: `gatsby-mdx`,
      options: {
        // defaultLayouts: {
        //   default: require.resolve('./src/templates/MDXTemplate.jsx'),
        // },
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              showCaptions: true,
              linkImagesToOriginal: false,
              quality: 95,
              maxWidth: 960,
              withWebp: true,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `mdxpages`,
        path: `${__dirname}/src/mdx`,
      },
    },
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: config.siteTitle,
    //     short_name: config.siteTitleShort,
    //     description: config.siteDescription,
    //     start_url: `/?utm_source=a2hs`,
    //     background_color: config.manifest.backgroundColor,
    //     theme_color: config.manifest.themeColor,
    //     display: `standalone`,
    //     icon: `src/images/favicon.png`,
    //   },
    // },
    // `gatsby-plugin-offline`,
  ],
}