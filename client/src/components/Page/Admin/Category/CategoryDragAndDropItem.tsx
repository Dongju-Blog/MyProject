import React, { useState } from "react";
import { css } from "@emotion/react";
import Input from "@/components/Interface/Input/Input";
import UseAnimations from "react-useanimations";
import visibility2 from "react-useanimations/lib/visibility2";
import trash2 from "react-useanimations/lib/trash2";
import settings from "react-useanimations/lib/settings";
import Button from "@/components/Interface/Button/Button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { putBoardAPI } from "@/api/board/putBoardAPI";
import { putBoardBodyType } from "@/types/board";
import NotiTemplate from "@/components/Interface/StackNotification/NotiTemplate";
import useNotification from "@/components/Interface/StackNotification/useNotification";
import { DELETE_ICON, INVISIBLE_ICON, SETTINGS_ICON, VISIBLE_ICON } from "@/components/Assets/AdminIcons";
import { deleteBoardAPI } from "@/api/board/deleteBoardAPI";

type CategoryDragAndDropItemPropsType = {
  id: number;
  name: string;
  isSecret: boolean;
  ordersState: {orders: number[], setOrders: React.Dispatch<React.SetStateAction<number[]>>}
};

function CategoryDragAndDropItem({
  id,
  name,
  isSecret,
  ordersState
}: CategoryDragAndDropItemPropsType) {
  const [nameInputState, setNameInputState] = useState(name);
  const [isSecretState, setIsSecretState] = useState(isSecret);
  const [isEditMode, setIsEditMode] = useState(false);

  const noti = useNotification();
  const queryClient = useQueryClient();

  const putBoardMutation = useMutation(
    ({ id, body }: { id: number; body: putBoardBodyType }) =>
      putBoardAPI({ id, body })
  );

  const deleteBoardMutation = useMutation(
    ({ id }: { id: number }) =>
      deleteBoardAPI({ id })
  );

  const deleteBoardHandler = async () => {
    if (confirm("카테고리가 삭제되면 카테고리 내 게시글 또한 모두 삭제되며, 이 작업은 되돌릴 수 없습니다. 그래도 삭제하시겠습니까? ")) {
      const newOrders = await ordersState.orders.filter((el) => el != id)
      await ordersState.setOrders(() => newOrders)
      await deleteBoardMutation.mutate(
        {id},
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["admin", "boards"]);
            noti({
              content: (
                <NotiTemplate
                  type={"alert"}
                  content={"카테고리를 삭제하였습니다."}
                />
              ),
              duration: 3000,
            });
          },
          onError: (err: any) => {
            if (err?.response?.data?.message) {
              noti({
                content: (
                  <NotiTemplate
                    type={"alert"}
                    content={err.response.data.message}
                  />
                ),
                duration: 3000,
              });
            } else {
              noti({
                content: (
                  <NotiTemplate
                    type={"alert"}
                    content="알 수 없는 오류가 발생하였습니다."
                  />
                ),
                duration: 3000,
              });
            }
          }
        }
      )
    } else {
        
    }
    
  }

  const changeBoardHandler = async (kind: "all" | "name" | "isSecret") => {
    const body = {
      name: kind === "all" || kind === "name" ? nameInputState : name,
      isSecret:
        kind === "all" || kind === "isSecret" ? !isSecretState : isSecret,
    };

    setIsSecretState((prev) => !prev);
    const put = await putBoardMutation.mutate(
      { id, body },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["admin", "boards"]);
          if (kind === "all") {
            setIsEditMode(() => false);
          }

          return;
        },
        onError: (err: any) => {
          if (err?.response?.data?.message) {
            noti({
              content: (
                <NotiTemplate
                  type={"alert"}
                  content={err.response.data.message}
                />
              ),
              duration: 3000,
            });
          } else if (err?.response?.data?.name) {
            noti({
              content: (
                <NotiTemplate type={"alert"} content={err.response.data.name} />
              ),
              duration: 3000,
            });
          } else {
            noti({
              content: (
                <NotiTemplate
                  type={"alert"}
                  content="알 수 없는 오류가 발생하였습니다."
                />
              ),
              duration: 3000,
            });
          }
          throw err;
        },
      }
    );
    return await put;
  };

  const isSecretButton = (
    <React.Fragment>
    {/* <UseAnimations
      animation={visibility2}
      size={24}
      onClick={() => changeBoardHandler("isSecret")}
      reverse={isSecretState}
      key={`isSecret-${JSON.stringify(isSecretState)}`}
    /> */}
    <span onClick={() => changeBoardHandler("isSecret")}>
      {isSecretState ? INVISIBLE_ICON : VISIBLE_ICON}
    </span>
    </React.Fragment>

  );

  const renderEdit = (
    <React.Fragment>
      <Input
        customCss={css`
          flex: 1;
          height: 100%;
        `}
        theme={"default"}
        value={nameInputState}
        onChange={(e) => setNameInputState(() => e.target.value)}
      >
        <Input.Right>
          <div css={editButtonWrapperCSS}>
            {isSecretButton}
            {/* <UseAnimations
              css={css`
                margin-top: -4px;
              `}
              animation={trash2}
              size={24}
            /> */}
            <span onClick={deleteBoardHandler}>
              {DELETE_ICON}
            </span>
            
          </div>
        </Input.Right>
      </Input>
      <Button
        theme={"default"}
        onClick={() => changeBoardHandler("all")}
        customCss={css`
          padding: 0px 15px 0px 15px;
          height: 100%;
        `}
      >
        Confirm
      </Button>
    </React.Fragment>
  );

  const renderNotEdit = (
    <React.Fragment>
      <span>{name}</span>
      <span
        css={noEditButtonWrapperCSS}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {isSecretButton}

        <span onClick={() => setIsEditMode(() => true)}>
          {SETTINGS_ICON}
        </span>
        
      </span>
    </React.Fragment>
  );

  const stopPropagationHandler = (e: any) => {
    if (isEditMode) {
      e.stopPropagation();
    }
  };

  return (
    <div
      css={itemInnerWrapperCSS}
      onMouseDown={(e) => stopPropagationHandler(e)}
    >
      {isEditMode ? renderEdit : renderNotEdit}
    </div>
  );
}

const itemInnerWrapperCSS = css`
  background-color: #ecf0ff;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  overflow: hidden;
  gap: 8px;

  & path {
    stroke: rgba(0, 0, 0, 0.6);
  }
`;

const editButtonWrapperCSS = css`
  padding: 0px 8px 0px 8px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  & span {
    height: 100%;
    display: flex;
    align-items: center;
  }
  & svg {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const noEditButtonWrapperCSS = css`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  & div {
    box-shadow: none !important;
  }
  
  & span {
    height: 100%;
    display: flex;
    align-items: center;
  }
  & svg {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default CategoryDragAndDropItem;
