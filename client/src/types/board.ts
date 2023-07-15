export type getAllBoardResponseType = boardItemType[]

export type boardItemType = {
  viewOrder: number
  isSecret: boolean
  name: string
  id: number
}

export type boardsOrdersBodyType = {
  ids: number[]
}

export type postBoardBodyType = {
  name: string
}

export type putBoardBodyType = {
  name: string
  isSecret: boolean
}