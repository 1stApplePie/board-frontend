import React from "react";
import styled from "styled-components";
import qs from "qs";
import Button from "../common/Button";
import palette from "../../lib/styles/palette";

const PaginationBlock = styled.div`
  width: 400px;
  margin: 1rem auto;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
`;
const PageNumber = styled.div``;

const buildLink = ({ username, tag, page }) => {
  const query = qs.stringify({ tag, page });
  return username ? `/${username}?${query}` : `/?${query}`;
};

const Pagination = ({ page, lastPage, username, tag }) => {
  const pageNumbers = Array.from({ length: lastPage }, (_, i) => i + 1);

  return (
    <PaginationBlock>
      <Button
        disabled={page === 1}
        to={
          page === 1 ? undefined : buildLink({ username, tag, page: page - 1 })
        }
        style={{
          height: "2.5rem",
          marginBottom: "3rem",
        }}
      >
        이전
      </Button>
      {pageNumbers.map((pageNumber) => (
        <Button
          key={pageNumber}
          to={buildLink({ username, tag, page: pageNumber })}
          style={{
            height: "2.5rem",
            fontWeight: pageNumber === page ? "bold" : "normal",
            background: pageNumber === page ? palette.gray[4] : palette.gray[8],
            marginBottom: "3rem",
          }}
        >
          {pageNumber}
        </Button>
      ))}
      <Button
        disabled={page === lastPage}
        to={
          page === lastPage
            ? undefined
            : buildLink({ username, tag, page: page + 1 })
        }
        style={{
          height: "2.5rem",
          marginBottom: "3rem",
        }}
      >
        다음
      </Button>
    </PaginationBlock>
  );
};

export default Pagination;
