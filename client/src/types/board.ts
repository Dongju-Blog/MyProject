export type getAllBoardResponseType = boardItemType[]

export type boardItemType = {
  viewOrder: number
  isSecret: boolean
  name: string
  id: number
}