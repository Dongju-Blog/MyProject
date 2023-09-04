import React, {useEffect, useState} from "react";
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
import ArticleCommentsLoading from "./ArticleCommentsLoading";

type ArticlePropsType = {
  articleId: number;
  boardName: string;
  isDelayed?: boolean;
};

function Article({ articleId, boardName, isDelayed = false }: ArticlePropsType) {
  const noti = useNotification();
  const router = useRouter();
  const auth = useAuthority();


  useEffect(() => {
    document.body.scrollTo({ left: 0, top: 0, behavior: "smooth" });


  }, [])


  const article = useQuery<getArticleResponseType>(
    [`Article`, `${articleId}`],
    () => getArticleAPI({ category: decodeURI(boardName), id: articleId }),
    {
      refetchOnWindowFocus: false,
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
            queryClient.invalidateQueries(["board", `${boardName}`]).then(() => {
              router.push(`/board/${boardName}`);
            });
            
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
          font-weight: 500;;
        `}
      >
        수정
      </Button>
      <Button
        theme={"text"}
        onClick={deleteOnClickHandler}
        css={css`
          font-size: 12px;
          font-weight: 500;;
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
    <div key={article.data?.updatedAt} css={articleWrapperCSS}>
      <div css={headerWrapperCSS}>
        <div css={titleWrapperCSS}>
          {isDelayed === false && article.data ? article.data.title : <Skeleton css={skeletonCSS} />}
          
        </div>
        <div css={decoratorCSS} className={"decoration"}/>
        <div css={articleInfoWrapperCSS}>
          <div css={subInfoWrapperCSS}>
            {isDelayed === false && article.data ? articleSubInfo : <Skeleton  css={skeletonCSS}/>}
          </div>
          {auth.currentUser.role === "ADMIN" && adminHeader}
        </div>
      </div>
      <div css={viewerWrapperCSS} className={"article-wrapper"}>
        {isDelayed === false && article.data ? <ArticleViewer content={article.data.content} /> : <Skeleton css={skeletonCSS}/>}
      </div>
      <div css={dividerCSS}/>
      <div css={commentsWrapperCSS}>
      {isDelayed === false ?
        <ArticleComments articleId={articleId} parentCommentId={null} depth={0} entity={10} /> :
        <ArticleCommentsLoading count={1} />}
      </div>
    </div>
  );
}

const articleWrapperCSS = css`
  
  @media ${mediaQuery.tablet} {
    background-color: white;
  }
  @media ${mediaQuery.overTablet} {
    width: 100%;
  background-color: white;
  box-shadow: 0px 0px 100px 1px rgba(0, 0, 0, 0.2);
  padding: 48px;
  border-radius: 4px;;
  }
`

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
    padding: 36px 0px 8px 0px;
  }
`;

const viewerWrapperCSS = css`
  & div p span h1 h2 h3 h4 h5 ul li video {
    content-visibility: auto;
    min-height: 16px;
  }
  
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
  & div {
    min-width: 280px !important;
  }

  
`;

const titleWrapperCSS = css`
  @media ${mediaQuery.tablet} {
    font-size: 36px;
    margin-bottom: 8px;
    min-height: 36px;
  }
  @media ${mediaQuery.overTablet} {
    font-size: 48px;
    font-weight: 500;
    margin-bottom: 16px;
    min-height: 48px;
  }
  /* color: #FF6372; */
  color: #006effd9;
  display: grid;
  word-break: keep-all;
  width: 100%;

  

`;

const decoratorCSS = css`

    margin-top: 28px;
    margin-bottom: 24px;
    width: 36px;
    height: 6px;
    /* background-color: #FF6372; */
    background-color: #006effd9;

`

const articleInfoWrapperCSS = css`
  display: flex;
  justify-content: space-between;
  

  @media ${mediaQuery.tablet} {

  }
  @media ${mediaQuery.overTablet} {
    margin-top: 96px;
  }
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
    padding: 0px 24px 16px 24px;
  }
  @media ${mediaQuery.overTablet} {
    margin-bottom: 16px;
    padding: 0px 0px 8px 0px;
  }

  
`




export default Article;
