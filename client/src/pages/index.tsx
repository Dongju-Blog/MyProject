import { css } from "@emotion/react";
import React, { useState } from "react";
// import Container from "@/components/Container/useContainer";
import { Container, useContainer } from "@/components/Container/useContainer";
// import Container from "@/components/Container/useContainer";

export default function Home() {
  const [step, completeStep, setStep] = useContainer({
    init: 1,
    duration: 1000,
  });

  return (
    <div
      css={css`
        width: 100vw;
        height: 100vh;
      `}
    >
      <Container currentStep={step} setStep={setStep} duration={1000}>
        <Container.Step>
          1
          <img
            src={"/test.bmp"}
            css={css`
              width: 10px;
              height: 10px;
            `}
            onLoad={() => {
              console.log(1);
            }}
          ></img>
          <button
            onClick={() => {
              setStep((prev: any) => prev + 1);
            }}
          >
            다음
          </button>
        </Container.Step>
        <Container.Step>
          <div
            css={css`
              height: 200vh;
              width: 100%;
              background-color: red;
            `}
          >
            2
            <img
              src={"/test.bmp"}
              css={css`
                width: 10px;
                height: 10px;
              `}
              onLoad={() => {
                console.log(2);
              }}
            ></img>
            <button
              onClick={() => {
                setStep((prev: any) => prev + 1);
              }}
            >
              다음
            </button>
          </div>
        </Container.Step>
        <Container.Step>
          3
          <img
            src={"/test.bmp"}
            css={css`
              width: 10px;
              height: 10px;
            `}
            onLoad={() => {
              console.log(3);
            }}
          ></img>
          <button
            onClick={() => {
              setStep((prev: any) => prev + 1);
            }}
          >
            다음
          </button>
        </Container.Step>
        <Container.Step>
          4
          <img
            src={"/test.bmp"}
            css={css`
              width: 10px;
              height: 10px;
            `}
            onLoad={() => {
              console.log(4);
            }}
          ></img>
          <button
            onClick={() => {
              setStep((prev: any) => prev + 1);
            }}
          >
            다음
          </button>
        </Container.Step>
      </Container>
    </div>
  );
}
