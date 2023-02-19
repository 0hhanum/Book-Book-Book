import { graphql, useStaticQuery } from "gatsby";
import React from "react";

interface IHelmet {
  title?: string;
}
export default function Helmet({ title }: IHelmet) {
  const titleQueryResponse = useStaticQuery<Queries.getTitleQuery>(graphql`
    query getTitle {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  return (
    <>
      <title>
        {title ? `${title} | ` : ""}
        {titleQueryResponse?.site?.siteMetadata?.title}
      </title>
      <link rel="icon" type="image/x-icon" href={"../../favicon.png"}></link>
    </>
  );
}
