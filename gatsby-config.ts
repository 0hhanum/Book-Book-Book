require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: "책책책, 책을 읽읍시다!",
    siteUrl: `https://www.yourdomain.tld`,
    description: "Contact Me! - rntls123@naver.com",
  },
  graphqlTypegen: true,
  plugins: [
    {
      resolve: "gatsby-source-contentful",
      options: {
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        spaceId: "drmlgrx4rnh5",
        contentTypeFilter: (contentType: any) => contentType.sys.id === "books",
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-mdx",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/contents`,
      },
    },
  ],
};

export default config;
