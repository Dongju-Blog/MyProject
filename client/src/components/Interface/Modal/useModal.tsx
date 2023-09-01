import React, {
  useState,
  useEffect,
  ReactNode,
  ReactElement,
  JSXElementConstructor,
  useCallback,
  useMemo,
} from "react";
import Portal from "../Portal/Portal";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";

type ModalPropsType = {
  transition: any;
  duration: number;
  hasBackdrop: boolean;
  compState: boolean;
  closeHandler: () => void;
  content: ReactNode;
};

type useModalPropsType = {
  transition?: transitionsKeyType;
  duration?: number;
  hasBackdrop?: boolean;
};

function useModal({
  transition = "scale",
  duration = 1000,
  hasBackdrop = true,
}: useModalPropsType = {}) {
  const [modalState, setModalState] = useState(false);

  const modal = (content: ReactNode): any => {
    if (content) {
      return ModalBridge.bind(null, {
        transition,
        duration,
        hasBackdrop,
        compState: modalState,
        closeHandler: setModalState.bind(null, () => false),
        content,
      })();
    }
  };

  modal.open = setModalState.bind(null, () => true);
  modal.close = setModalState.bind(null, () => false);
  modal.state = modalState;

  return modal;
}

function ModalBridge(props: ModalPropsType) {
  return <Modal {...props} />;
}

function Modal({
  transition,
  duration,
  hasBackdrop,
  compState,
  closeHandler,
  content,
}: ModalPropsType) {
  const [modalState, setModalState] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (compState) {
      setTimeout(() => {
        setModalState(() => true);
      }, 30);
    } else {
      if (modalState) {
        setTimeout(() => {
          setModalState(() => false);
        }, duration);
      }
    }
  }, [compState]);

  const renderContent = React.cloneElement(
    content as ReactElement<any, string | JSXElementConstructor<any>>,
    {
      closeComp: closeHandler,
    }
  );

  if (modalState || compState) {
    return (
      <Portal>
        <div css={modalWrapperCSS}>
          <div
            css={backdropCSS({ hasBackdrop, compState, modalState, duration })}
          />
          <div
            css={transitions({ compState, modalState, duration })[transition]}
            onClick={closeHandler}
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
}

const backdropCSS = ({
  hasBackdrop,
  compState,
  modalState,
  duration,
}: {
  hasBackdrop: boolean;
  compState: boolean;
  modalState: boolean;
  duration: number;
}) => {
  return css`
    position: fixed;
    width: 100vw;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    opacity: ${hasBackdrop && compState ? (modalState ? "100%" : "0%") : "0%"};
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

type transitionsKeyType =
  | "fadeIn"
  | "scale"
  | "rightToLeft"
  | "bottomToTop"
  | "flip";

const transitions = ({
  compState,
  modalState,
  duration,
}: {
  compState: boolean;
  modalState: boolean;
  duration: number;
}) => {
  const data: { [prop: string]: any } = {
    fadeIn: css`
      position: relative;
      width: 100%;
      height: 100%;
      transition-timing-function: cubic-bezier(0.5, 0.25, 0, 1);
      transition-duration: ${duration}ms;
      transition-property: opacity;
      opacity: ${compState ? (modalState ? "100%" : "0%") : "0%"};
    `,
    scale: css`
      position: relative;
      width: 100%;
      height: 100%;
      transition-timing-function: cubic-bezier(0.5, 0.25, 0, 1);
      transition-duration: ${duration}ms;
      transition-property: opacity transform;
      opacity: ${compState ? (modalState ? "100%" : "0%") : "0%"};
      transform: ${compState
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
      left: ${compState ? (modalState ? "0" : "100%") : "100%"};
    `,
    bottomToTop: css`
      position: relative;
      width: 100%;
      height: 100%;
      transition-timing-function: cubic-bezier(0.5, 0.25, 0, 1);
      transition-duration: ${duration}ms;
      transition-property: top;
      top: ${compState ? (modalState ? "0" : "100%") : "100%"};
    `,
    flip: css`
      width: 100%;
      height: 100%;
      transition-timing-function: cubic-bezier(0.5, 0.25, 0, 1);
      transition-duration: ${duration}ms;
      transition-property: top;
      position: relative;
      perspective: 500px;
      top: ${compState ? (modalState ? "0" : "5%") : "5%"};

      & .inner-wrapper {
        transition-duration: ${duration}ms;
        transition-property: transform opacity;
        backface-visibility: hidden;
        /* transition: 1s; */
        transform: ${compState
          ? modalState
            ? "rotateX(0deg)"
            : "rotateX(60deg)"
          : "rotateX(60deg)"};
        opacity: ${compState ? (modalState ? "100%" : "0%") : "0%"};
      }
    `,
  };

  return data;
};

const innerWrapperCSS = css``;

export default useModal;
