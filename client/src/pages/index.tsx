import { css } from "@emotion/react";
import React, { useState, useEffect } from "react";
// import Container from "@/components/Container/useContainer";
import {
  Container,
  useContainer,
} from "@/components/Interface/Container/useContainer";
import HomeContainer1 from "@/components/Page/Home/HomeContainer1";
import HomeContainer2 from "@/components/Page/Home/HomeContainer2";
import HomeContainer3 from "@/components/Page/Home/HomeContainer3";
import { useRouter } from "next/router";
import HomeContainer4 from "@/components/Page/Home/HomeContainer4";
import useResponsive from "@/hooks/useResponsive";
import mediaQuery from "@/util/responsive";
import MobileHomeContainer1 from "@/components/Page/Home/MobileHomeContainer1";
// import Container from "@/components/Container/useContainer";


export default function Home() {
  const [steps, setStep, setCondition] = useContainer({
    init: 1,
    duration: 1000,
  });
  const isDesktop = useResponsive(mediaQuery.overTablet)

  const router = useRouter()
  useEffect(() => {
    if (!isDesktop) {
      setTimeout(() => router.push('/#1'), 100)
    }
  }, [isDesktop])

  const desktop = (
    <Container key={`container-desktop`} steps={steps} setStep={setStep} duration={1000}>
        <Container.Step>
          <HomeContainer1
            setCondition={setCondition}
            currentStep={1}
            setStep={setStep}
          />
        </Container.Step>
        <Container.Step>
          <HomeContainer4 setCondition={setCondition} currentStep={2} />
        </Container.Step>
        <Container.Step>
          <HomeContainer2 setCondition={setCondition} currentStep={3} />
        </Container.Step>
        <Container.Step>
          <HomeContainer3 setCondition={setCondition} currentStep={4} />
        </Container.Step>
        
      </Container>
  )

  const mobile = (
    <Container key={`container-mobile`} steps={steps} setStep={setStep} duration={1000}>
      <Container.Step>
          <MobileHomeContainer1
            setCondition={setCondition}
            currentStep={1}
            setStep={setStep}
          />
        </Container.Step>
    </Container>
  )

  return (
    <div
      css={css`
        width: 100vw;
        height: 100%;
      `}
    >
      
      {isDesktop ? desktop : mobile}
    </div>
  );
}
