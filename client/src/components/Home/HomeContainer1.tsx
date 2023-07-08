import React, {useEffect, useRef} from "react";
import { css } from "@emotion/react";
import ContainerContent from "../Container/ContainerContent";
import Animator from "../Animator/Animator";
import { setConditionType } from "../Container/useContainer";



type HomeContainer1Type = {
  setCondition: setConditionType
  currentStep: number
  setStep: Function
}

function HomeContainer1({setCondition, currentStep, setStep}: HomeContainer1Type) {
  const condition = setCondition(currentStep)
  const testRef = useRef<HTMLDivElement>(null)

  
  const parellelogram = (
    <div css={[Animator.Translate({id: 'parellel', trigger: condition.immediate, duration: 1000, delay: 200, offset: ['70vw', '0px'], option:{ hasReverse: true }}), css`
      width: 100vw;
      height: 100vw;
      border-radius: 100%;;
      /* background: linear-gradient( to right, white, rgba(0, 0, 0, 0.3) ); */
      background-color: rgba(0, 0, 0, 0.1);
      position: absolute;
      right: -30vw;
      top: -7vw;
      /* visibility: hidden; */
    `]}/>
  )


  return (
    <ContainerContent customCss={containerWrapperCSS}>
      {parellelogram}
      <ContainerContent.Inner customCss={innerContentWrapperCSS}>
        <div>
          <img src={'/test.bmp'} onLoad={()=>{console.log('Rerendered')}} css={css`width: 10px; height: 10px;`}/>
          <div
            css={[Animator.Translate({id: 'label', trigger: condition.maintain, duration: 1000, delay: 200, offset: ['0px', '100px']}), css`
              font-size: 5vw;
            `]}
          >
            Hi!
          </div>
          <div
            css={[Animator.Translate({id: 'label', trigger: condition.maintain, duration: 1000, delay: 300, offset: ['0px', '100px']}), css`
            font-size: 5vw;
          `]}
          >
            I'm Frontend Developer!
          </div>
          <div
            css={[Animator.Translate({id: 'label', trigger: condition.maintain, duration: 1000, delay: 400, offset: ['0px', '100px']}), css`
            font-size: 2vw;
          `]}
          >
            But I know how to handle the backend, CI/CD as well!
          </div>
          <button onClick={() => setStep(() => 3)}>setStep</button>
        </div>
        <div></div>
      </ContainerContent.Inner>
      
    </ContainerContent>
  );
}

const containerWrapperCSS = css`
  background-color: white;
  overflow: hidden;
`;

const innerContentWrapperCSS = css`
  display: flex;
`;

export default HomeContainer1;
