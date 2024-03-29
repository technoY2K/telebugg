require('dotenv').config({
    path: `.env`,
})
const path = require('path')

module.exports = {
    siteMetadata: {
        title: `telebugg`,
        description: `The FRIENDLY software engineering Q & A website for the 21st century.`,
        author: `jhamPac`,
        url: 'https://www.telebug.gg',
        twitterUsername: '@telebugg',
    },
    plugins: [
        `gatsby-plugin-styled-components`,
        `gatsby-plugin-react-helmet`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        `gatsby-transformer-json`,
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-typescript`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `./src/app/_shared/web3/contract`,
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `telebugg`,
                short_name: `telebugg`,
                start_url: `/`,
                background_color: `#f8f8f2`,
                theme_color: `#50fa7b`,
                display: `minimal-ui`,
                icon: `assets/telebugg.png`, // This path is relative to the root of the site.
            },
        },
        {
            resolve: `gatsby-plugin-typography`,
            options: {
                pathToConfigModule: `src/utils/typography`,
            },
        },
        {
            resolve: `gatsby-plugin-alias-imports`,
            options: {
                alias: {
                    '@assets': path.resolve(__dirname, 'assets'),
                    '@app': path.resolve(__dirname, 'src/app'),
                    '@hooks': path.resolve(__dirname, 'src/app/_shared/hooks'),
                    '@shared': path.resolve(__dirname, 'src/app/_shared'),
                    '@srcRoot': path.resolve(__dirname, 'src'),
                },
                extensions: ['js, ts'],
            },
        },
        {
            resolve: 'gatsby-plugin-react-svg',
            options: {
                rule: {
                    include: /assets/, // See below to configure properly
                },
            },
        },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ],
}
