/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react"
import React, { useState, useRef, useEffect, useCallback } from "react"
import Swipe from "react-easy-swipe"
import styles from "./SwipeableGallery.module.css"
// import { useIsResponsive } from "@/components/Responsive/useIsResponsive";

type SwipeableGalleryPropsType = {
	content: any[]
	contentCount: number
	setContentCount: React.Dispatch<React.SetStateAction<number>>
}
const SwipeableGallery = ({ content, contentCount, setContentCount }: SwipeableGalleryPropsType) => {
	const movingDiv = useRef<HTMLInputElement>(null)
	const [positionx, setPositionx] = useState<number>(0)
	// const [contentCount, setContentCount] = useState(0)
	const [endSwipe, setEndSwipe] = useState(true)
	const postData = content
	// const [isDeskTop, isTablet, isMobile] = useIsResponsive();

	// const [width, setWidth] = useState(null)
	// const [height, setHeight] = useState(null)

	// useEffect(() => {
	// 	setWidth(() => parentRef.current.clientWidth)
	// 	setHeight(() => parentRef.current.clientHeight)

	// 	const resize = () => {
	// 		setWidth(() => parentRef.current.clientWidth)
	// 		setHeight(() => parentRef.current.clientHeight)
	// 		if (movingDiv.current !== null && parentRef.current.clientWidth) {
	// 			movingDiv.current.style.transitionDuration = "0s"
	// 			movingDiv.current.style.transform = `translateX(${-parentRef.current.clientWidth * (contentCount - 1)}px)`
	// 		}
	// 	}
	// 	window.addEventListener(`resize`, resize)

	// 	return () => {
	// 		window.removeEventListener(`resize`, resize)
	// 	}
	// }, [contentCount])

	const onSwipeMove = (position = { x: 0 }) => {
		setEndSwipe(false)
		if (content.length === 1) {
			return
		}

		// if (
		// 	(contentCount >= content.length && positionx < 0) ||
		// 	(contentCount === 1 && positionx > 0) ||
		// 	(width !== null && Math.abs(positionx) > width)
		// ) {
		// 	return
		// }

		if (position.x !== null) {
			const x = position.x
			setPositionx(() => x)
		}
	}

	const onSwipeEnd = () => {


		if (positionx < -50 && contentCount < content.length - 1) {
			setContentCount((prev) => prev + 1)
		}
		if (positionx > 50 && contentCount > 0) {
			setContentCount((prev) => prev - 1)
		}


		setPositionx(() => 0)
		setEndSwipe(true)
	}

	const onClickNextBtn = useCallback(() => {

			if (contentCount < content.length - 1) {
				setContentCount((prev) => prev + 1)
			} else {
				setContentCount(() => 0)
			}

	}, [contentCount])

	const onClickPrevBtn = useCallback(() => {

			if (contentCount > 0) {
				setContentCount((prev) => prev - 1)
			} else {
				setContentCount(() => content.length - 1)
			}

	}, [contentCount])

	// useEffect(() => {
	// 	const autoSlide = setInterval(function () {
	// 		onClickNextBtn()
	// 	}, 10000)

	// 	return () => {
	// 		clearInterval(autoSlide)
	// 	}
	// }, [contentCount])
	//

	const indicator = content.map((el: any, idx: number) => {
		return <div key={`indicator-${idx}`} css={indicatorCSS({ idx, contentCount })}></div>
	})

	const indicatorBtn = (
		<>
			<div css={prevBtnCSS} onClick={onClickPrevBtn}>
				〈
			</div>
			<div css={nextBtnCSS} onClick={onClickNextBtn}>
				〉
			</div>
		</>
	)

	return (
		<div css={outerWrapperCSS}>
			{/* {isMobile === false && indicatorBtn} */}
			<div css={indicatorWrapperCSS()}>{indicator}</div>
			{indicatorBtn}
			
			<Swipe
				onSwipeStart={(event: any) => {
					event.stopPropagation()
				}}
				onSwipeEnd={onSwipeEnd}
				onSwipeMove={onSwipeMove}
				css={swipeWrapperCSS}
			>
		
					{content.map((el: any, idx: number) => {
							return (
								
		
								<div
									key={`banner-${idx}`}
									css={contentCSS({idx, contentCount, positionx, endSwipe})}
								>
									{el}
								</div>
					
								
							) //, height: height + 'px'
						})}
					

						
				
					</Swipe>


		</div>
	)
}

export default SwipeableGallery

const outerWrapperCSS = css`
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
`

const wrapperCSS = css`

  /* width: 300px;
    height: 300px; */
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;


`

const contentCSS = ({idx, contentCount, positionx, endSwipe}: {idx: number; contentCount: number; positionx: number; endSwipe: boolean}) => {
	return css`
	  /* display: inline-block; */
		/* justify-content: center;
		align-items: center; */
		position: absolute;
		/* background-color: rgb(250, 250, 250); */
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		transition: ${endSwipe && `transform 1s`};
		transition-timing-function: cubic-bezier(0.5, 0.25, 0, 1);
		transform: translateX(calc(${-100 * (contentCount - idx)}% + ${positionx}px));
	`
} 

const moveableCSS = css`
	  display: flex;
  transition-property: transform;
	width: 100%;
	height: 100%;
`

const swipeWrapperCSS = css`
	width: 100%;
	height: 100%;
	overflow: hidden;
	display: flex;
	position: relative;
	/* flex-wrap: wrap;
	flex-direction: row; */

`

const prevBtnCSS = css`
	z-index: 9;
	position: absolute;
	left: 0;
	height: 100%;
	display: flex;
	align-items: center;
	font-size: 48px;
	font-weight: 700;
	padding-left: 8px;
	padding-right: 8px;
	color: white;
	transition-property: font-size;
	transition-duration: 0.2s;
	cursor: pointer;
	user-select: none;

	&:hover {
		font-size: 54px;
	}
`

const nextBtnCSS = css`
	z-index: 9;
	position: absolute;
	right: 0;
	height: 100%;
	display: flex;
	align-items: center;
	font-size: 48px;
	font-weight: 700;
	padding-left: 8px;
	padding-right: 8px;
	color: white;
	transition-property: font-size;
	transition-duration: 0.2s;
	cursor: pointer;
	user-select: none;

	&:hover {
		font-size: 54px;
	}
`

const indicatorWrapperCSS = () => {
	return css`
		z-index: 9;
		position: absolute;
		color: white;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: end;
		pointer-events: none;
		padding-bottom: 0.5vw;
	`
}

interface indicatorCSSProps {
	idx: number
	contentCount: number
}
const indicatorCSS = ({ idx, contentCount }: indicatorCSSProps) => {
	return css`
		width: 30px;
		height: 2px;
		transition: background-color 1s;
		background-color: ${contentCount === idx ? "white" : "gray"};
		margin: 2px;
		box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.2);
	`
}
