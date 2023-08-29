import { storeUserType } from "@/types/auth";
import { activeBoardItemType } from "@/types/board";
import { createStore, atom } from "jotai"


export const mainStore = createStore()

const stackNotification = atom<{ [prop: number]: { width: string; height: string; duration: number; content: any } }>(
	{},
)



const storeUser = atom<storeUserType>({
	username: null,
	status: null,
	role: null,
})

const category = atom<activeBoardItemType[]>([])

const pauseAnimation = atom<boolean>(false)

const codeBlockOption = atom<{wrap: boolean}>({
	wrap: true
})

const codeBlockExplorerOption = atom<{unfoldAuto: boolean}>({
	unfoldAuto: true
})

export {
	stackNotification,
	storeUser,
	category,
	pauseAnimation,
	codeBlockOption,
	codeBlockExplorerOption
}
