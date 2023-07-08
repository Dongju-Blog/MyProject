import { css } from "@emotion/react";
import React, { useState } from "react";
// import Container from "@/components/Container/useContainer";
import { Container, useContainer } from "@/components/Container/useContainer";
import HomeContainer1 from "@/components/Home/HomeContainer1";
import HomeContainer2 from "@/components/Home/HomeContainer2";
import HomeContainer3 from "@/components/Home/HomeContainer3";
// import Container from "@/components/Container/useContainer";

export default function Home() {
  const [steps, setStep, setCondition] = useContainer({
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
      <Container steps={steps} setStep={setStep} duration={1000}>
        {/* <Container.Step>
          ds
        </Container.Step> */}
        <Container.Step>
          <HomeContainer1 setCondition={setCondition} currentStep={1} setStep={setStep} />
        </Container.Step>
        <Container.Step>
          <HomeContainer2 setCondition={setCondition} currentStep={2} />
        </Container.Step>
        <Container.Step>
        <HomeContainer3 setCondition={setCondition} currentStep={3} />
        </Container.Step>
        {/* <Container.Step>
        <div css={css`background-color: purple; width: 100%; height: 100vh;`}>{step}<button onClick={() => setStep((prev: any) => prev + 1)}>다음</button></div>
        </Container.Step> */}
      </Container>
    </div>
  );
}
