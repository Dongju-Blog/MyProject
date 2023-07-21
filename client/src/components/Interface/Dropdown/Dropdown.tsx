import { ARROW_ICON } from "@/components/Assets/CommonIcons";
import { css, SerializedStyles } from "@emotion/react";
import { debounce, throttle } from "lodash";
import React, {
  ReactNode,
  useState,
  useEffect,
  Children,
  ReactElement,
} from "react";

type DropdownPropsType = {
  children: ReactNode;
  state: number;
  setState: React.Dispatch<React.SetStateAction<number>>;
  theme: ThemeProviderKeys;
  customCss?: SerializedStyles | SerializedStyles[];
};

type DropdownItemPropsType = {
  id: number;
  children: ReactNode;
};

function Dropdown({
  children,
  state,
  setState,
  customCss,
  theme,
}: DropdownPropsType) {
  const [isVisible, setIsVisible] = useState(false);
  const [triggerState, setTriggerState] = useState(false);

  useEffect(() => {

    const throttleHandler = throttle(() => {
        if (triggerState === false) {
          setIsVisible(() => false)
        }
    }, 1000, {leading: false, trailing: true});

    const triggerHandler = () => {
      if (triggerState) {
        if (triggerState === true) {
          setIsVisible(() => true);
        }
        
      } else {
        throttleHandler()
      }
    }

    triggerHandler()

    return () => {
      throttleHandler.cancel();
    };


    
  }, [triggerState]);

  const selectHandler = (id: number) => {
    setTriggerState(() => false);
    setState(() => id);
  };

  const itemArray = (
    Children.toArray(children) as Array<ReactElement<DropdownItemPropsType>>
  ).filter((el) => typeof el.props.id === "number" && el.type === DropdownItem);

  const renderItem = itemArray.map((el, idx) => {
    return (
      <div className={"item"} onClick={() => selectHandler(el.props.id)}>
        {el}
      </div>
    );
  });

  const renderItemsWrapper = isVisible && (
    <div className={"items-wrapper"} css={itemsWrapperCSS}>{renderItem}</div>
  );

  return (
    <div
      css={
        Array.isArray(customCss)
          ? [
              initDropdownCSS({ triggerState }),
              ...themeProvider({ triggerState })[theme],
              ...customCss,
            ]
          : [
              initDropdownCSS({ triggerState }),
              ...themeProvider({ triggerState })[theme],
              customCss,
            ]
      }
    >
      <div className={"selected"} onClick={() => setTriggerState((prev) => !prev)}>
        {itemArray.filter((el) => el.props.id === state)}
        <div className={"arrow-wrapper"}>
          {ARROW_ICON}
        </div>
      </div>
      {renderItemsWrapper}
    </div>
  );
}

const DropdownItem = ({ id, children }: DropdownItemPropsType) => {
  return <React.Fragment>{children}</React.Fragment>;
};

type ThemeProviderKeys = "default";
type themeProviderType = { [prop: string]: SerializedStyles[] };

Dropdown.Item = DropdownItem;

const initDropdownCSS = ({ triggerState }: { triggerState: boolean }) => {
  return css`
    position: relative;
    user-select: none;
    cursor: pointer;

    & .selected {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    & .arrow-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      transition: transform 0.5s;
      transform: ${triggerState ? `rotate(180deg)` : `rotate(0deg)`};
    }

    & .item {
      display: flex;
      align-items: center;
    }

    & .items-wrapper {
      animation: ${triggerState ? `show 1000ms ease forwards` : `hide 1000ms ease forwards`};


      @keyframes show {
        from {
          opacity: 0%;
          transform: scale(110%);
        }

        to {
          opacity: 100%;
          transform: scale(100%);
        }
      }

      @keyframes hide {
        from {
          opacity: 100%;
          transform: scale(100%);
        }

        to {
          opacity: 0%;
          transform: scale(110%);
        }
      }
    }
  `;
};

const itemsWrapperCSS = css`
  width: 100%;
  position: absolute;
  z-index: 999;
`

const themeProvider = ({ triggerState }: { triggerState: boolean }) => {
  const themes: themeProviderType = {
    default: [
      css`
        
        & .selected {
          /* border-radius: 2px; */
          transition: box-shadow 0.5s;
          /* box-shadow: inset 0px 0px 0px 1px rgba(0, 0, 0, 0.1); */
          /* border-right: 1px solid rgba(0, 0, 0, 0.1); */
          padding-left: 8px;
          padding-right: 8px;
        }

        & .items-wrapper {
          top: 110%;
          border-radius: 2px;
          transition: box-shadow 0.5s;
          background-color: white;
          box-shadow: inset 0px 0px 0px 1px rgba(0, 0, 0, 0.1);
          
        }

        & .item {
          padding-left: 8px;
          transition: background-color 0.5s;
          min-height: 24px;

          &:hover {
            background-color: rgba(0, 0, 0, 0.1);
          }
          
        }
      `,
    ],
  };

  return themes;
};

export default Dropdown;
