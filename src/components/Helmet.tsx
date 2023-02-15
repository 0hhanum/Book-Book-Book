import { graphql, useStaticQuery } from "gatsby";
import React from "react";

interface IHelmet {
  title?: string;
}
export default function Helmet({ title }: IHelmet) {
  // This query will executed when build !
  // It's literally "Static" query
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
    <title>
      {title ? `${title} | ` : ""}
      {titleQueryResponse?.site?.siteMetadata?.title}
    </title>
  );
}
