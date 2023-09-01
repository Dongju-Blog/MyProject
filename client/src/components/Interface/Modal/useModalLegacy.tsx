import React, { useState, useEffect, useMemo } from "react";
import Portal from "../Portal/Portal";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";

type ModalPropsType = {
  children: JSX.Element;
};

type useModalPropsType =
  | "fadeIn"
  | "scale"
  | "rightToLeft"
  | "bottomToTop"
  | "flip";

function useModalLegacy(transition: useModalPropsType, duration: number) {
  const [isModalOn, setIsModalOn] = useState(false);

  const openModalHandler = () => {
    setIsModalOn(() => true);
  };

  const Modal = useMemo(
    () =>
      ({ children }: ModalPropsType) => {
        const [modalState, setModalState] = useState<boolean>(false);
        const router = useRouter();

        const [inModalState, setInModalState] = useState<boolean>(isModalOn);
        const [closeModalState, setCloseModalState] = useState<boolean>(false);

        const closeModalHandler = () => {
          setCloseModalState(() => true);
        };

        useEffect(() => {
          if (closeModalState) {
            setInModalState(() => false);
          }
        }, [closeModalState]);

        useEffect(() => {
          if (!closeModalState) {
            setTimeout(() => {
              setModalState(() => true);
            }, 30);
          } else {
            setTimeout(() => {
              setModalState(() => false);
              setIsModalOn(() => false);
            }, duration);
          }
        }, [closeModalState]);

        const renderContent = React.cloneElement(children, {
          closeModalHandler,
        });

        if (isModalOn) {
          return (
            <Portal>
              <div css={modalWrapperCSS}>
                <div
                  css={backdropCSS({ inModalState, modalState, duration })}
                />
                <div
                  css={
                    transitions({ inModalState, modalState, duration })[
                      transition
                    ]
                  }
                  onClick={closeModalHandler}
                >
                  <div
                    className={"inner-wrapper"}
                    css={innerWrapperCSS}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {renderContent}
                  </div>
                </div>
              </div>
            </Portal>
          );
        } else {
          return <React.Fragment />;
        }
      },
    [isModalOn]
  );

  return [Modal, openModalHandler, isModalOn] as const;
}

const backdropCSS = ({
  inModalState,
  modalState,
  duration,
}: {
  inModalState: boolean;
  modalState: boolean;
  duration: number;
}) => {
  return css`
    position: fixed;
    width: 100vw;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    opacity: ${inModalState ? (modalState ? "100%" : "0%") : "0%"};
    transition-duration: ${duration}ms;
    transition-property: opacity;
  `;
};

const modalWrapperCSS = css`
  position: fixed;
  width: 100vw;
  height: 100%;
  z-index: 199999999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const transitions = ({
  inModalState,
  modalState,
  duration,
}: {
  inModalState: boolean;
  modalState: boolean;
  duration: number;
}) => {
  const data: { [prop: string]: any } = {
    fadeIn: css`
      position: relative;
      /* width: 100%;
			height: 100%; */
      transition-timing-function: cubic-bezier(0.5, 0.25, 0, 1);
      transition-duration: ${duration}ms;
      transition-property: opacity;
      opacity: ${inModalState ? (modalState ? "100%" : "0%") : "0%"};
    `,
    scale: css`
      position: relative;
      width: 100%;
      height: 100%;
      transition-timing-function: cubic-bezier(0.5, 0.25, 0, 1);
      transition-duration: ${duration}ms;
      transition-property: opacity transform;
      opacity: ${inModalState ? (modalState ? "100%" : "0%") : "0%"};
      transform: ${inModalState
        ? modalState
          ? "scale(1)"
          : "scale(1.1)"
        : "scale(1.1)"};
    `,
    rightToLeft: css`
      position: relative;
      width: 100%;
      height: 100%;
      transition-timing-function: cubic-bezier(0.5, 0.25, 0, 1);
      transition-duration: ${duration}ms;
      transition-property: left;
      left: ${inModalState ? (modalState ? "0" : "100%") : "100%"};
    `,
    bottomToTop: css`
      position: relative;
      width: 100%;
      height: 100%;
      transition-timing-function: cubic-bezier(0.5, 0.25, 0, 1);
      transition-duration: ${duration}ms;
      transition-property: top;
      top: ${inModalState ? (modalState ? "0" : "100%") : "100%"};
    `,
    flip: css`
      width: 100%;
      height: 100%;
      transition-timing-function: cubic-bezier(0.5, 0.25, 0, 1);
      transition-duration: ${duration}ms;
      transition-property: top;
      position: relative;
      perspective: 500px;
      top: ${inModalState ? (modalState ? "0" : "5%") : "5%"};

      & .inner-wrapper {
        transition-duration: ${duration}ms;
        transition-property: transform opacity;
        backface-visibility: hidden;
        /* transition: 1s; */
        transform: ${inModalState
          ? modalState
            ? "rotateX(0deg)"
            : "rotateX(60deg)"
          : "rotateX(60deg)"};
        opacity: ${inModalState ? (modalState ? "100%" : "0%") : "0%"};
      }
    `,
  };

  return data;
};

const innerWrapperCSS = css``;

export default useModalLegacy;
