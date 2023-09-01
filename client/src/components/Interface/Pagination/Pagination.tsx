import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import Button from "../Button/Button";

type PaginationPropsType = {
  maxPage: number;
  currentPage: number;
  baseUrl: string;
  queryString: string;
};

function Pagination({
  currentPage,
  maxPage,
  baseUrl,
  queryString,
}: PaginationPropsType) {
  const [pages, setPages] = useState<number[]>([]);
  const router = useRouter();

  useEffect(() => {
    let start = currentPage - 5 >= 0 ? currentPage - 5 : 0;
    if (maxPage - currentPage < 10) {
      if (maxPage - 10 >= 0) {
        start = maxPage - 10;
      } else {
        start = 0;
      }
    }
    const end = start + 10 <= maxPage ? start + 10 : maxPage;
    const range = [...Array(end - start)].map((v = start, i) => v + i);
    setPages(() => range);

    document.body.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  }, [currentPage]);

  const pageOnClickHandler = (page: number) => {
    if (baseUrl.includes("?")) {
      router.push(`${baseUrl}&${queryString}=${page + 1}`);
    } else {
      router.push(`${baseUrl}?${queryString}=${page + 1}`);
    }
  };

  const prevOnClickHandler = () => {
    const targetPage = pages[0] !== 0 ? pages[0] : pages[0] + 1;
    if (baseUrl.includes("?")) {
      router.push(`${baseUrl}&${queryString}=${targetPage}`);
    } else {
      router.push(`${baseUrl}?${queryString}=${targetPage}`);
    }
  };

  const nextOnClickHandler = () => {
    const targetPage =
      pages[pages.length - 1] + 2 < maxPage
        ? pages[pages.length - 1] + 2
        : maxPage;
    if (baseUrl.includes("?")) {
      router.push(`${baseUrl}&${queryString}=${targetPage}`);
    } else {
      router.push(`${baseUrl}?${queryString}=${targetPage}`);
    }
  };

  const renderPages = pages.map((el, idx) => {
    return (
      <div
        key={`pagination-${el}`}
        onClick={() => {
          pageOnClickHandler(el);
        }}
        css={buttonWrapperCSS({ target: el + 1, current: currentPage })}
      >
        <Button theme={"text"}>{el + 1}</Button>
      </div>
    );
  });

  return (
    <div css={paginationWrapperCSS}>
      <Button theme={"text"} onClick={prevOnClickHandler}>
        〈 Prev
      </Button>
      {renderPages}
      <Button theme={"text"} onClick={nextOnClickHandler}>
        Next 〉
      </Button>
    </div>
  );
}

const paginationWrapperCSS = css`
  display: flex;
  justify-content: center;
  gap: 16px;
`;

const buttonWrapperCSS = ({
  target,
  current,
}: {
  target: number;
  current: number;
}) => {
  return css`
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    background-color: ${target === current && "rgba(0, 0, 0, 0.1)"};
    cursor: pointer;
  `;
};

export default Pagination;
