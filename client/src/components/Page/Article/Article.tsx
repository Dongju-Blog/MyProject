import React from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getArticleResponseType } from "@/types/board";
import { getArticleAPI } from "@/api/board/getArticleAPI";
import ArticleViewer from "./ArticleViewer";
import { deleteArticleAPI } from "@/api/board/deleteArticleAPI";
import useNotification from "@/components/Interface/StackNotification/useNotification";
import NotiTemplate from "@/components/Interface/StackNotification/NotiTemplate";
import Button from "@/components/Interface/Button/Button";
import useAuthority from "@/hooks/useAuthority";
import { css } from "@emotion/react";
import mediaQuery from "@/util/responsive";
import { dateFormatter } from "@/util/dateFormatter";
import Skeleton from "@/components/Interface/Loading/Skeleton";
import ArticleComments from "./ArticleComments";

type ArticlePropsType = {
  articleId: number;
  boardName: string;
};

function Article({ articleId, boardName }: ArticlePropsType) {
  const noti = useNotification();
  const router = useRouter();
  const auth = useAuthority();

  const article = useQuery<getArticleResponseType>(
    [`${decodeURI(boardName)}`, `${articleId}`],
    () => getArticleAPI({ category: decodeURI(boardName), id: articleId }),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: 300000,
      cacheTime: 300000,
    }
  );

  const queryClient = useQueryClient();

  const deleteArticleMutation = useMutation(
    ({ id, category }: { id: number; category: string }) =>
      deleteArticleAPI({ id, category })
  );

  const deleteOnClickHandler = () => {
    if (confirm("게시글을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) {
      deleteArticleMutation.mutate(
        { id: articleId, category: boardName },
        {
          onSuccess: () => {
            noti({
              content: (
                <NotiTemplate
                  type={"alert"}
                  content={"게시글을 삭제하였습니다."}
                />
              ),
              duration: 5000,
            });
            router.push(`/board/${boardName}`);
          },
        }
      );
    }
  };

  const adminHeader = (
    <div
      css={css`
        display: flex;
        gap: 8px;
      `}
    >
      <Button
        theme={"text"}
        onClick={() => router.push(`/board/${boardName}/${articleId}/update`)}
        css={css`
          font-size: 12px;
        `}
      >
        수정
      </Button>
      <Button
        theme={"text"}
        onClick={deleteOnClickHandler}
        css={css`
          font-size: 12px;
        `}
      >
        삭제
      </Button>
    </div>
  );

  const articleSubInfo = (
    <React.Fragment>
      <span
        css={css`
          font-weight: 600;
        `}
      >
        {decodeURI(boardName)}
      </span>{" "}
      ·{" "}
      <span
        css={css`
          color: rgba(0, 0, 0, 0.6);
        `}
      >
        {article.data && dateFormatter(article.data.createdAt)}
      </span>
    </React.Fragment>
  )

  return (
    <React.Fragment>
      <div css={headerWrapperCSS}>
        <div css={titleWrapperCSS}>
          {article.data ? article.data.title : <Skeleton css={skeletonCSS} />}
        </div>
        <div css={articleInfoWrapperCSS}>
          <div css={subInfoWrapperCSS}>
            {article.data ? articleSubInfo : <Skeleton  css={skeletonCSS}/>}
          </div>
          {auth.currentUser.role === "ADMIN" && adminHeader}
        </div>
      </div>
      <div css={viewerWrapperCSS}>
        {article.data ? <ArticleViewer content={article.data.content} /> : <Skeleton css={skeletonCSS}/>}
      </div>
      <div css={dividerCSS}/>
      <div css={commentsWrapperCSS}>
        <ArticleComments articleId={articleId} parentCommentId={null} depth={0} />
      </div>
    </React.Fragment>
  );
}

const headerWrapperCSS = css`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  @media ${mediaQuery.tablet} {
    /* margin-top: 96px; */
    /* background-color: rgba(0, 0, 0, 0.05); */
    background-color: #eceffc85;
    padding: 96px 24px 16px 24px;
  }
  @media ${mediaQuery.overTablet} {
    margin-bottom: 16px;
    padding: 96px 0px 8px 0px;
  }
`;

const viewerWrapperCSS = css`
  margin-top: 16px;
  /* display: flex;
  flex-direction: column; */
  display: grid;
  @media ${mediaQuery.tablet} {
    /* margin-top: 96px; */
    /* background-color: rgba(0, 0, 0, 0.05); */
    padding: 0px 24px 16px 24px;
  }
  @media ${mediaQuery.overTablet} {
    margin-bottom: 16px;
    padding: 0px 0px 8px 0px;
  }
  flex: 1;
  min-height: 360px;
`;

const titleWrapperCSS = css`
  @media ${mediaQuery.tablet} {
    
    margin-bottom: 8px;
  }
  @media ${mediaQuery.overTablet} {

    font-weight: 700;
    margin-bottom: 16px;
  }
  font-size: 36px;
  display: grid;
  min-height: 36px;
  width: 100%;

`;

const articleInfoWrapperCSS = css`
  display: flex;
  justify-content: space-between;
`;

const subInfoWrapperCSS = css`
  height: 24px;
  min-width: 220px;
`

const skeletonCSS = css`
  width: 100%;
  height: 100%;
  flex: 1;
`

const dividerCSS = css`
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
  margin-top: 36px;
  margin-bottom: 36px;
`

const commentsWrapperCSS = css`
  @media ${mediaQuery.tablet} {
    /* margin-top: 96px; */
    /* background-color: rgba(0, 0, 0, 0.05); */
    padding: 0px 8px 16px 8px;
  }
  @media ${mediaQuery.overTablet} {
    margin-bottom: 16px;
    padding: 0px 0px 8px 0px;
  }
`

export default Article;
