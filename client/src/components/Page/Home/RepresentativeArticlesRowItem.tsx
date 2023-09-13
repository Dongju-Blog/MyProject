import { getArticlesItemType } from '@/types/board'
import { dateFormatter } from '@/util/dateFormatter'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import React, {useEffect, useRef, useState} from 'react'
import ModalArticle from '../Article/ModalArticle'
import useResponsive from '@/hooks/useResponsive'
import mediaQuery from '@/util/responsive'
import { useAtom } from "jotai";
import { pauseAnimation } from "@/store/store";

type RepresentativeArticlesRowItemPropsType = {
  article: getArticlesItemType
}

function RepresentativeArticlesRowItem({article}: RepresentativeArticlesRowItemPropsType) {
  const router = useRouter()
  const itemRef = useRef<HTMLDivElement>(null)
  const [isModalOn, setIsModalOn] = useState(false)
  const isMobile = useResponsive(mediaQuery.tablet)
  const [pauseAnimationAtom, setPauseAnimationAtom] = useAtom(pauseAnimation)
  const [calc, setCalc] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  }>();

  const onClickHandler = () => {
    if (isMobile) {
      router.push(`/board/${article.boardName}/${article.id}`)
    } else {
      setPauseAnimationAtom(() => true)
      setIsModalOn(() => true)
    }
  }

  useEffect(() => {
    if (isModalOn && itemRef.current) {

      const left =  itemRef.current.getBoundingClientRect().left
      const top = itemRef.current.getBoundingClientRect().top
      const width = itemRef.current.clientWidth
      const height = itemRef.current.clientHeight
  setCalc(() => {
    return {
      top,
      left,
      width,
      height,
    };
  }); 
    }
    
  }, [isModalOn])

  const render = (
    <React.Fragment>
      <div css={imageWrapperCSS}>
        {article.thumbnail ? (
          <img
            src={article.thumbnail}
            css={css`
              height: 100%;
              width: 100%;
              object-fit: cover;
            `}
          />
        ) : (
          <img
            src={"/assets/Thumbnail.png"}
            css={css`
              filter: invert(80%);
              width: 70%;
              height: auto;
            `}
          />
        )}
      </div>
      <div css={contentWrapperCSS}>
          <div css={css`font-size: 20px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;`}>{article.title}</div>
          <div css={css`font-size: 14px; color: rgba(0, 0, 0, 0.5);`}>{dateFormatter(article.createdAt)}</div>
      </div>
    </React.Fragment>
  )

  return (
    <div ref={itemRef} css={carouselArticleitemWrapperCSS({isModalOn})} onClick={onClickHandler}>
      {isModalOn && calc && <ModalArticle calc={calc} parentRef={itemRef} setIsModalOn={setIsModalOn} article={article} thumbnail={render} />}
      {render}
    </div>
  )
}

export const carouselArticleitemWrapperCSS = ({isModalOn}: {isModalOn: boolean}) => css`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 30px 1px rgba(0, 0, 0, 0.3);
  background-color: white;
  overflow: hidden;
  border-radius: 20px;;
  position: relative;
  cursor: pointer;
  
  transition: transform 1s, box-shadow 1s;
  &:hover {
    /* transform: scale(105%); */
    /* transform: translateY(-5px); */
    box-shadow: 0px 10px 15px 0px rgba(0, 0, 0, 0.4);
    /* box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.6); */
  }
`

const imageWrapperCSS = css`
  height: 70%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.05);
`;

const contentWrapperCSS = css`
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px;
`

export default RepresentativeArticlesRowItem