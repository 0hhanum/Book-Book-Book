import React from "react";
import styled from "styled-components";
import Filter from "./Filter";
import { useRecoilState } from "recoil";
import { filteredAuthorAtom } from "../../atoms";
import { graphql, useStaticQuery } from "gatsby";

const Aside = styled.aside`
  position: fixed;
  width: ${(props) => `${props.theme.variables.sidebarWidth}px`};
  top: ${(props) => `${props.theme.variables.headerHeight}px`};
  bottom: 0;
  left: 0;
  border-right: ${(props) => `1px solid ${props.theme.normalColor}`};
`;
const Ul = styled.ul``;

const Sidebar = () => {
  const {
    allContentfulBooks: { nodes: authors },
  } = useStaticQuery<Queries.getAuthorQuery>(graphql`
    query getAuthor {
      allContentfulBooks {
        nodes {
          author
        }
      }
    }
  `);
  const [filteredAuthor, setFilteredAuthor] =
    useRecoilState(filteredAuthorAtom);
  const handleClickFilter = (author: string) => {
    if (author === filteredAuthor) {
      setFilteredAuthor("");
    } else {
      setFilteredAuthor(author);
    }
  };
  return (
    <Aside>
      <Ul>
        {authors.map(({ author }) => (
          <Filter
            key={author}
            author={author!}
            isFilteredAuthor={filteredAuthor === author}
            onClick={() => handleClickFilter(author!)}
          />
        ))}
      </Ul>
    </Aside>
  );
};

export default Sidebar;
