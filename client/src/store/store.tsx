import { createStore, atom } from "jotai"


export const mainStore = createStore()

const stackNotification = atom<{ [prop: number]: { width: string; height: string; duration: number; content: any } }>(
	{},
)

export {
	stackNotification,
}
