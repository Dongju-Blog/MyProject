import React, {
  ReactNode,
  useState,
  Children,
  ReactElement,
  isValidElement,
  useMemo,
  useEffect,
  useRef,
  MutableRefObject
} from "react";
import { css } from "@emotion/react";

interface ContainerProps {
  currentStep: number;
  duration: number
  setStep: React.Dispatch<React.SetStateAction<number>>;
  children?: ReactNode;
}

interface StepProps {
  targetStep: number;
  children: ReactNode;
}


  const useContainer = ({init, duration}: {init: number, duration: number}) => {

    
    const [step, setStep] = useState(init)

    const [completeStep, setCompleteStep] = useState(init)

    

    useEffect(() => {
      setTimeout(() => {setCompleteStep(() => step)}, duration)
    }, [step])

    const setStepHandler = (param: any) => {
      if (step === completeStep) {
        setStep(param)
      }
    }

    
    return [step, completeStep, setStepHandler] as const
  }



const Container = ({currentStep, setStep, duration, children}: ContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  

  const onScrollHandler = (e:React.WheelEvent<HTMLDivElement>) => {
    console.log(containerRef)
    const last = validChildren && validChildren[validChildren.length - 1].props.targetStep
    if (containerRef.current) {
      if (e.deltaY > 0 && currentStep < Number(last)) {
        if (containerRef.current.clientHeight >= containerRef.current.scrollHeight || containerRef.current.scrollHeight  <= containerRef.current.clientHeight + containerRef.current.scrollTop) {
          setStep((prev) => prev + 1)
        }
      } else if (e.deltaY < 0 && currentStep > 1) {
        if (containerRef.current.clientHeight >= containerRef.current.scrollHeight || containerRef.current.scrollTop === 0) {
          setStep((prev) => prev - 1)
        }
      }
    }
  }

  const validChildren = children && Children.toArray(children)
      .filter(isValidElement)
      .filter((i) => {
        const targetStep = (i.props as Partial<StepProps>).targetStep;
        if (targetStep) {
          return currentStep - 1 <= targetStep && currentStep + 1 >= targetStep;
        }
      }) as Array<ReactElement<StepProps>>;

  const render = validChildren && useMemo(() => validChildren.map((el, idx) => {
    return (
      <div onWheel={onScrollHandler} key={`step-${el.props.targetStep}`} ref={currentStep === el.props.targetStep ? containerRef : null} onClick={() => console.log(containerRef)} css={stepComponentCSS({step: currentStep, targetStep: el.props.targetStep, duration})}>
        {el.props.children}
      </div>
    )
  }), [validChildren])

      
  return <div css={containerWrapperCSS}>{render}</div>;
};

export const Step = ({targetStep, children}: StepProps) => {
  return (
  <>
    {children}
  </>
    )
};

const containerWrapperCSS = css`
  position: relative;
  overflow-y: hidden;
  max-height: 100vh;
  min-height: 100vh;
`

const stepComponentCSS = ({step, targetStep, duration}: {step: number; targetStep: number; duration: number}) => {
  return css`
  position: absolute;
  min-height: 100vh;
  max-height: 100vh;
  min-width: 100%;
  max-width: 100%;
  transition-duration: ${duration}ms;
  transition-property: all;
  overflow-y: scroll;
  transform: translateY(calc(-100% * ${step - targetStep}));

  -ms-overflow-style: none; /* 인터넷 익스플로러 */
    scrollbar-width: none; /* 파이어폭스 */

  & ::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
}

  


  `
}


Container.Step = Step
export {useContainer, Container};


